import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UpdateProductInTheCartMutation($input: UpdateProductInTheCartInput!) {
    updateProductInTheCart(input: $input) {
      item {
        id
        quantity
      }
      market {
        ...ProductCardListContainer_market

        cart {
          totalItemsQuantity
          totalItemsPrice
          ...CartContentContainer_cart
        }
      }
    }
  }
`;

function commit(environment, onCompleted, productId, quantity) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { productId, quantity },
    },
    onCompleted,
  });
};

export default { commit };
