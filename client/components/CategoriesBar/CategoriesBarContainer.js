import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import CategoriesBar from './CategoriesBarComponent';

export default createFragmentContainer(CategoriesBar, {
  market: graphql`
    fragment CategoriesBarContainer_market on Market {
      categories (
        first: 2147483647 # max GraphQLInt
      ) {
        edges {
          node {
            id
            name
          }
        }
      }
    }`
});
