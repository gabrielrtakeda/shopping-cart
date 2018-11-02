import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import ProductCardListComponent from './ProductCardListComponent';

export default createFragmentContainer(ProductCardListComponent, {
  market: graphql`
    fragment ProductCardListContainer_market on Market {
      products (
        first: 2147483647 # max GraphQLInt
      ) {
        list: edges {
          product: node {
            id
            name
            categoryId
            attributes
            image
            description
            quantity
          }
        }
      }
    }`
});
