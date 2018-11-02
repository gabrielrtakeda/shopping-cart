export class Todo {}
export class User {}
export class Category {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;
const usersById = {
  [VIEWER_ID]: viewer,
};

// Mock todo data
const todosById = {};
const todoIdsByUser = {
  [VIEWER_ID]: [],
};
let nextTodoId = 0;
addTodo('Taste JavaScript', true);
addTodo('Buy a unicorn', false);
addTodo('Buy a camel', false);

export function addTodo(text, complete) {
  const todo = new Todo();
  todo.complete = !!complete;
  todo.id = `${nextTodoId++}`;
  todo.text = text;
  todosById[todo.id] = todo;
  todoIdsByUser[VIEWER_ID].push(todo.id);
  return todo.id;
}

export function changeTodoStatus(id, complete) {
  const todo = getTodo(id);
  todo.complete = complete;
}

export function getTodo(id) {
  return todosById[id];
}

export function getTodos(status = 'any') {
  const todos = todoIdsByUser[VIEWER_ID].map(id => todosById[id]);
  if (status === 'any') {
    return todos;
  }
  return todos.filter(todo => todo.complete === (status === 'completed'));
}

export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}

export function markAllTodos(complete) {
  const changedTodos = [];
  getTodos().forEach(todo => {
    if (todo.complete !== complete) {
      todo.complete = complete;
      changedTodos.push(todo);
    }
  });
  return changedTodos.map(todo => todo.id);
}

export function removeTodo(id) {
  const todoIndex = todoIdsByUser[VIEWER_ID].indexOf(id);
  if (todoIndex !== -1) {
    todoIdsByUser[VIEWER_ID].splice(todoIndex, 1);
  }
  delete todosById[id];
}

export function removeCompletedTodos() {
  const todosToRemove = getTodos().filter(todo => todo.complete);
  todosToRemove.forEach(todo => removeTodo(todo.id));
  return todosToRemove.map(todo => todo.id);
}

export function renameTodo(id, text) {
  const todo = getTodo(id);
  todo.text = text;
}

// Mock `Categories` data
const categoriesById = {};
const categoryIdsByUser = {
  [VIEWER_ID]: [],
};
let nextCategoryId = 0;
addCategory('Argentina');
addCategory('Baiana');
addCategory('Bebidas');
addCategory('Cafeteria');
addCategory('Carnes');
addCategory('Casa de Sucos');
addCategory('Comida Alemã');
addCategory('Comida Árabe');
addCategory('Comida Asiática');
addCategory('Comida Brasileira');
addCategory('Comida Contemporânea');

export function addCategory(name) {
  const category = new Category();
  category.id = `${nextCategoryId++}`;
  category.name = name;
  categoriesById[category.id] = category;
  categoryIdsByUser[VIEWER_ID].push(category.id);
  return category.id;
}

export function getCategories() {
  return categoryIdsByUser[VIEWER_ID].map(id => categoriesById[id]);
}

export function getCategory(id) {
  return categoriesById[id];
}
