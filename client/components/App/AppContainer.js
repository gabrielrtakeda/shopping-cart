import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../../services/relay/environment';
import AppComponent from './AppComponent';

const AppContainerQuery = graphql`
  query AppContainerQuery {
    market {
      ...CategoriesBarContainer_market
      ...ProductCardListContainer_market
    }
  }
`;

const AppContainer = () => (
  <QueryRenderer
    environment={environment}
    query={AppContainerQuery}
    variables={{}}
    render={({ error, props }) => props ?
      <AppComponent {...props} /> :
      <div>Loading</div>
    }
  />
);

export default AppContainer;
