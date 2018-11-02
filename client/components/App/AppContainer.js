import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import App from './AppComponent';

export default createFragmentContainer(App, {
  market: graphql`
    fragment AppContainer_market on Market {
      ...CategoriesBarContainer_categories
    }`
});
