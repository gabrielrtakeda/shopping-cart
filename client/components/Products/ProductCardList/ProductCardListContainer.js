import {
  createRefetchContainer,
  graphql,
} from 'react-relay';
import ProductCardListComponent from './ProductCardListComponent';

export default createRefetchContainer(
  ProductCardListComponent,
  graphql`
    fragment ProductCardListContainer_market on Market
    @argumentDefinitions (
      categoryId: { type: "String", defaultValue: "all" }
    ) {
      ...CategoriesBarContainer_market
      products (
        first: 2147483647
        categoryId: $categoryId
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
    }
  `,
  graphql`
    query ProductCardListContainerRefetchQuery($categoryId: String) {
      market {
        ...ProductCardListContainer_market @arguments(categoryId: $categoryId)
      }
    }
  `
);
