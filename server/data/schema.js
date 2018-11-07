import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} from 'graphql-relay'

import {
  Market,
  Category,
  Product,
  Cart,
  CartItem,

  getMarket,
  getCategory,
  getCategories,
  getProduct,
  getProductsByCategory,
  getCart,
  getCartItem,
  getCartItems,
  getCartItemsTotalPrice,
  getCartItemsQuantity,

  removeProductFromCart,
  updateProductInTheCart
} from './database'

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId)

    switch (type) {
      case 'Market': return getMarket(id)
      case 'Category': return getCategory(id)
      case 'Product': return getProduct(id)
      case 'ProductCategory': return getCategory(id)
      case 'Cart': return getCart(id)
      case 'CartItem': return getCartItem(id)
      default: return null
    }
  },
  obj => {
    switch (obj.constructor) {
      case Market: return GraphQLMarket
      case Category: return GraphQLCategory
      case Product: return GraphQLProduct
      case Cart: return GraphQLCart
      case CartItem: return GraphQLCartItem
      default: return null
    }
  }
)

const GraphQLProductCategory = new GraphQLObjectType({
  name: 'ProductCategory',
  fields: {
    id: globalIdField('ProductCategory'),
    name: {
      type: GraphQLString,
      resolve: obj => obj.name
    }
  },
  interfaces: [nodeInterface]
})

const GraphQLPrice = new GraphQLObjectType({
  name: 'Price',
  fields: {
    default: {
      type: GraphQLFloat,
      resolve: obj => obj.default
    },
    sale: {
      type: GraphQLFloat,
      resolve: obj => obj.sale
    }
  }
})

const GraphQLProduct = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: globalIdField('Product'),
    categoryId: {
      type: GraphQLInt,
      resolve: obj => obj.categoryId
    },
    category: {
      type: GraphQLProductCategory,
      resolve: obj => getCategory(obj.categoryId)
    },
    quantity: {
      type: GraphQLInt,
      resolve: obj => obj.quantity
    },
    price: {
      type: GraphQLPrice,
      resolve: obj => obj.price
    },
    name: {
      type: GraphQLString,
      resolve: obj => obj.name
    },
    attributes: {
      type: new GraphQLList(GraphQLString),
      resolve: obj => obj.attributes
    },
    image: {
      type: GraphQLString,
      resolve: obj => obj.image
    },
    description: {
      type: GraphQLString,
      resolve: obj => obj.description
    }
  },
  interfaces: [nodeInterface]
})

const { connectionType: ProductsConnection } = connectionDefinitions({
  name: 'Product',
  nodeType: GraphQLProduct
})

const GraphQLCategory = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: globalIdField('Category'),
    name: {
      type: GraphQLString,
      resolve: obj => obj.name
    },
    products: {
      type: ProductsConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(getProductsByCategory(obj.id), args)
    }
  },
  interfaces: [nodeInterface]
})

const { connectionType: CategoriesConnection } = connectionDefinitions({
  name: 'Category',
  nodeType: GraphQLCategory
})

const GraphQLCartItem = new GraphQLObjectType({
  name: 'CartItem',
  fields: {
    id: globalIdField('CartItem'),
    quantity: {
      type: GraphQLInt,
      resolve: obj => obj.quantity
    },
    product: {
      type: GraphQLProduct,
      resolve: (obj, args) => getProduct(obj.productId)
    }
  },
  interfaces: [nodeInterface]
})

const { connectionType: CartItemsConnection } = connectionDefinitions({
  name: 'CartItem',
  nodeType: GraphQLCartItem
})

const GraphQLCart = new GraphQLObjectType({
  name: 'Cart',
  fields: {
    id: globalIdField('Cart'),
    items: {
      type: CartItemsConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(getCartItems(), args)
    },
    totalItemsQuantity: {
      type: GraphQLInt,
      resolve: () => getCartItemsQuantity()
    },
    totalItemsPrice: {
      type: GraphQLFloat,
      resolve: () => getCartItemsTotalPrice()
    }
  },
  interfaces: [nodeInterface]
})

const GraphQLMarket = new GraphQLObjectType({
  name: 'Market',
  fields: {
    id: globalIdField('Market'),
    categories: {
      type: CategoriesConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(getCategories(), args)
    },
    categoriesTotalCount: {
      type: GraphQLInt,
      resolve: () => getCategories().length
    },
    product: {
      type: GraphQLProduct,
      args: {
        id: {
          type: GraphQLID
        },
        ...connectionArgs
      },
      resolve: (obj, { id, ...args }) => {
        const { id: rawId } = fromGlobalId(id)
        return (
          getProduct(rawId)
        )
      }
    },
    products: {
      type: ProductsConnection,
      args: {
        categoryId: {
          type: GraphQLString,
          defaultValue: 'all'
        },
        ...connectionArgs
      },
      resolve: (obj, { categoryId, ...args }) => {
        const { type, id } = fromGlobalId(categoryId)
        return (
          connectionFromArray(getProductsByCategory(type ? id : 'all'), args)
        )
      }
    },
    cart: {
      type: GraphQLCart,
      resolve: () => getCart()
    }
  },
  interfaces: [nodeInterface]
})

const GraphQLUpdateProductInTheCartMutation = mutationWithClientMutationId({
  name: 'UpdateProductInTheCart',
  inputFields: {
    productId: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    append: { type: GraphQLBoolean, defaultValue: false }
  },
  outputFields: {
    item: {
      type: GraphQLCartItem,
      resolve: ({ itemUpdated }) => itemUpdated
    },
    market: {
      type: GraphQLMarket,
      resolve: () => getMarket()
    }
  },
  mutateAndGetPayload: ({ productId, quantity, append }) => {
    const rawProductId = fromGlobalId(productId).id
    const {
      item: itemUpdated,
      product: productUpdated
    } = updateProductInTheCart(Number(rawProductId), quantity, append)

    return { itemUpdated, productUpdated }
  }
})

const GraphQLRemoveProductFromCartMutation = mutationWithClientMutationId({
  name: 'RemoveProductFromCart',
  inputFields: {
    productId: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    item: {
      type: GraphQLCartItem,
      resolve: () => getCartItems()
    },
    market: {
      type: GraphQLMarket,
      resolve: () => getMarket()
    }
  },
  mutateAndGetPayload: ({ productId }) => {
    const rawProductId = fromGlobalId(productId).id
    const { product } = removeProductFromCart(Number(rawProductId))
    return product
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    categories: {
      type: CategoriesConnection,
      resolve: (obj, args) =>
        connectionFromArray(getCategories(), args)
    },
    market: {
      type: GraphQLMarket,
      resolve: () => getMarket()
    },
    node: nodeField
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    removeProductFromCart: GraphQLRemoveProductFromCartMutation,
    updateProductInTheCart: GraphQLUpdateProductInTheCartMutation
  }
})

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
