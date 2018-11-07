import { VIEWER_ID } from '../constants'

export class Todo {}

export const todosById = {}
export const todoIdsByUser = {
  [VIEWER_ID]: []
}
let nextTodoId = 0

export const addTodo = (text, complete) => {
  const todo = new Todo()
  todo.complete = !!complete
  todo.id = `${nextTodoId++}`
  todo.text = text
  todosById[todo.id] = todo
  todoIdsByUser[VIEWER_ID].push(todo.id)
  return todo.id
}

export const changeTodoStatus = (id, complete) => {
  const todo = getTodo(id)
  todo.complete = complete
}

export const getTodo = (id) => {
  return todosById[id]
}

export const getTodos = (status = 'any') => {
  const todos = todoIdsByUser[VIEWER_ID].map(id => todosById[id])
  if (status === 'any') {
    return todos
  }
  return todos.filter(todo => todo.complete === (status === 'completed'))
}

export const markAllTodos = (complete) => {
  const changedTodos = []
  getTodos().forEach(todo => {
    if (todo.complete !== complete) {
      todo.complete = complete
      changedTodos.push(todo)
    }
  })
  return changedTodos.map(todo => todo.id)
}

export const removeTodo = (id) => {
  const todoIndex = todoIdsByUser[VIEWER_ID].indexOf(id)
  if (todoIndex !== -1) {
    todoIdsByUser[VIEWER_ID].splice(todoIndex, 1)
  }
  delete todosById[id]
}

export const removeCompletedTodos = () => {
  const todosToRemove = getTodos().filter(todo => todo.complete)
  todosToRemove.forEach(todo => removeTodo(todo.id))
  return todosToRemove.map(todo => todo.id)
}

export const renameTodo = (id, text) => {
  const todo = getTodo(id)
  todo.text = text
}

// Mock todo data
addTodo('Taste JavaScript', true)
addTodo('Buy a unicorn', false)
addTodo('Buy a camel', false)
