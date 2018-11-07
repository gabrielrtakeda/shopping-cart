import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation RemoveProductFromCartMutation($input: RemoveProductFromCartInput!) {
    removeProductFromCart(input: $input) {
      market {
        ...ProductCardListContainer_market

        cart {
          ...CartContentContainer_cart
        }
      }
    }
  }
`;

function commit(environment, onCompleted, productId) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { productId },
    },
    onCompleted,
  });
};

export default { commit };
