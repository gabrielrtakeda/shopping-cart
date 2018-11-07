import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import CartContentComponent from './CartContentComponent'

export default createFragmentContainer(
  CartContentComponent,
  graphql`
    fragment CartContentContainer_cart on Cart {
      items (first: 2147483647) {
        list: edges {
          item: node {
            quantity
            product {
              id
              category {
                name
              }
              quantity
              price {
                default
                sale
              }
              name
              image
            }
          }
        }
      }
      totalItemsQuantity
      totalItemsPrice
    }
  `
)
