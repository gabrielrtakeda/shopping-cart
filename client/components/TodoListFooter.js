import RemoveCompletedTodosMutation from '../mutations/RemoveCompletedTodosMutation'

import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'

class TodoListFooter extends React.Component {
  _handleRemoveCompletedTodosClick = () => {
    const edges = this.props.viewer.todos.edges.filter(
      edge => edge.node.complete === true
    )
    RemoveCompletedTodosMutation.commit(
      this.props.relay.environment,
      {
        edges
      },
      this.props.viewer
    )
  };
  render () {
    const numCompletedTodos = this.props.viewer.completedCount
    const numRemainingTodos = this.props.viewer.totalCount - numCompletedTodos
    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{numRemainingTodos}</strong> item
          {numRemainingTodos === 1 ? '' : 's'} left
        </span>
        {numCompletedTodos > 0 && (
          <button
            className='clear-completed'
            onClick={this._handleRemoveCompletedTodosClick}>
            Clear completed
          </button>
        )}
      </footer>
    )
  }
}

export default createFragmentContainer(
  TodoListFooter,
  graphql`
    fragment TodoListFooter_viewer on User {
      id
      completedCount
      todos(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
          }
        }
      }
      totalCount
    }
  `
)
