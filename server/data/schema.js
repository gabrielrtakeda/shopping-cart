import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import {
  Todo,
  User,
  Market,
  Category,
  Product,

  addTodo,
  changeTodoStatus,

  getTodo,
  getTodos,
  getUser,
  getViewer,
  getMarket,
  getCategory,
  getCategories,
  getProduct,
  getProducts,
  getProductsByCategory,

  markAllTodos,
  removeCompletedTodos,
  removeTodo,
  renameTodo,
} from './database';

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    console.log(fromGlobalId(globalId));

    switch(type) {
      case 'Todo': return getTodo(id);
      case 'User': return getUser(id);
      case 'Market': return getMarket(id);
      case 'Category': return getCategory(id);
      case 'Product': return getProduct(id);
      default: return null;
    }
  },
  obj => {
    switch(obj.constructor) {
      case Todo: return GraphQLTodo;
      case User: return GraphQLUser;
      case Market: return GraphQLMarket;
      case Category: return GraphQLCategory;
      case Product: return GraphQLProduct;
      default: return null;
    }
  },
);

const GraphQLTodo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
    text: {
      type: GraphQLString,
      resolve: obj => obj.text,
    },
    complete: {
      type: GraphQLBoolean,
      resolve: obj => obj.complete,
    },
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: TodosConnection,
  edgeType: GraphQLTodoEdge,
} = connectionDefinitions({
  name: 'Todo',
  nodeType: GraphQLTodo,
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    todos: {
      type: TodosConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: (obj, {status, ...args}) =>
        connectionFromArray(getTodos(status), args),
    },
    totalCount: {
      type: GraphQLInt,
      resolve: () => getTodos().length,
    },
    completedCount: {
      type: GraphQLInt,
      resolve: () => getTodos('completed').length,
    },
  },
  interfaces: [nodeInterface],
});

const GraphQLAddTodoMutation = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    text: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    todoEdge: {
      type: GraphQLTodoEdge,
      resolve: ({localTodoId}) => {
        const todo = getTodo(localTodoId);
        return {
          cursor: cursorForObjectInConnection(getTodos(), todo),
          node: todo,
        };
      },
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({text}) => {
    const localTodoId = addTodo(text);
    return {localTodoId};
  },
});

const GraphQLChangeTodoStatusMutation = mutationWithClientMutationId({
  name: 'ChangeTodoStatus',
  inputFields: {
    complete: {type: new GraphQLNonNull(GraphQLBoolean)},
    id: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    todo: {
      type: GraphQLTodo,
      resolve: ({localTodoId}) => getTodo(localTodoId),
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id, complete}) => {
    const localTodoId = fromGlobalId(id).id;
    changeTodoStatus(localTodoId, complete);
    return {localTodoId};
  },
});

const GraphQLMarkAllTodosMutation = mutationWithClientMutationId({
  name: 'MarkAllTodos',
  inputFields: {
    complete: {type: new GraphQLNonNull(GraphQLBoolean)},
  },
  outputFields: {
    changedTodos: {
      type: new GraphQLList(GraphQLTodo),
      resolve: ({changedTodoLocalIds}) => changedTodoLocalIds.map(getTodo),
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({complete}) => {
    const changedTodoLocalIds = markAllTodos(complete);
    return {changedTodoLocalIds};
  },
});

// TODO: Support plural deletes
const GraphQLRemoveCompletedTodosMutation = mutationWithClientMutationId({
  name: 'RemoveCompletedTodos',
  outputFields: {
    deletedTodoIds: {
      type: new GraphQLList(GraphQLString),
      resolve: ({deletedTodoIds}) => deletedTodoIds,
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: () => {
    const deletedTodoLocalIds = removeCompletedTodos();
    const deletedTodoIds = deletedTodoLocalIds.map(
      toGlobalId.bind(null, 'Todo'),
    );
    return {deletedTodoIds};
  },
});

const GraphQLRemoveTodoMutation = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    deletedTodoId: {
      type: GraphQLID,
      resolve: ({id}) => id,
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id}) => {
    const localTodoId = fromGlobalId(id).id;
    removeTodo(localTodoId);
    return {id};
  },
});

const GraphQLRenameTodoMutation = mutationWithClientMutationId({
  name: 'RenameTodo',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    text: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    todo: {
      type: GraphQLTodo,
      resolve: ({localTodoId}) => getTodo(localTodoId),
    },
  },
  mutateAndGetPayload: ({id, text}) => {
    const localTodoId = fromGlobalId(id).id;
    renameTodo(localTodoId, text);
    return {localTodoId};
  },
});

const GraphQLProduct = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: globalIdField('Product'),
    name: {
      type: GraphQLString,
      resolve: obj => obj.name,
    },
    categoryId: {
      type: GraphQLInt,
      resolve: obj => obj.categoryId,
    },
    attributes: {
      type: new GraphQLList(GraphQLString),
      resolve: obj => obj.attributes,
    },
    image: {
      type: GraphQLString,
      resolve: obj => obj.image,
    },
    description: {
      type: GraphQLString,
      resolve: obj => obj.description,
    },
    quantity: {
      type: GraphQLInt,
      resolve: obj => obj.quantity,
    },
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: ProductsConnection,
  edgeType: GraphQLProductEdge,
} = connectionDefinitions({
  name: 'Product',
  nodeType: GraphQLProduct,
});

const GraphQLCategory = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: globalIdField('Category'),
    name: {
      type: GraphQLString,
      resolve: obj => obj.name,
    },
    products: {
      type: ProductsConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(getProductsByCategory(obj.id), args),
    },
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: CategoriesConnection,
  edgeType: GraphQLCategoryEdge,
} = connectionDefinitions({
  name: 'Category',
  nodeType: GraphQLCategory,
});

const GraphQLMarket = new GraphQLObjectType({
  name: 'Market',
  fields: {
    id: globalIdField('Market'),
    categories: {
      type: CategoriesConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(getCategories(), args),
    },
    categoriesTotalCount: {
      type: GraphQLInt,
      resolve: () => getCategories().length,
    },
  },
  interfaces: [nodeInterface],
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
    categories: {
      type: CategoriesConnection,
      resolve: (obj, args) =>
        connectionFromArray(getCategories(), args),
    },
    market: {
      type: GraphQLMarket,
      resolve: () => getMarket(),
    },
    node: nodeField,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: GraphQLAddTodoMutation,
    changeTodoStatus: GraphQLChangeTodoStatusMutation,
    markAllTodos: GraphQLMarkAllTodosMutation,
    removeCompletedTodos: GraphQLRemoveCompletedTodosMutation,
    removeTodo: GraphQLRemoveTodoMutation,
    renameTodo: GraphQLRenameTodoMutation,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
