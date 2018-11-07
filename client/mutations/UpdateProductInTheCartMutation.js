import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation UpdateProductInTheCartMutation($input: UpdateProductInTheCartInput!) {
    updateProductInTheCart(input: $input) {
      market {
        ...ProductCardListContainer_market

        cart {
          ...CartContentContainer_cart
        }
      }
    }
  }
`

const commit = (environment, onCompleted, productId, quantity, append) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { productId, quantity, append }
    },
    onCompleted
  })
}

export default { commit }
