import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import CategoriesBarComponent from './CategoriesBarComponent';

export default createFragmentContainer(CategoriesBarComponent, {
  market: graphql`
    fragment CategoriesBarContainer_market on Market {
      categories (first: 2147483647) {
        list: edges {
          category: node {
            id
            name
          }
        }
      }
    }
  `
});
