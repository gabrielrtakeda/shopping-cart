import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../../services/relay/environment'
import AppComponent from './AppComponent'

const AppContainerQuery = graphql`
  query AppContainerQuery {
    market {
      ...CategoriesBarContainer_market
      ...ProductCardListContainer_market

      cart {
        totalItemsQuantity
        totalItemsPrice
        ...CartContentContainer_cart
      }
    }
  }
`

const AppContainer = () => (
  <QueryRenderer
    environment={environment}
    query={AppContainerQuery}
    variables={{}}
    render={({ props }) => props
      ? <AppComponent {...props} />
      : <div>Loading</div>
    }
  />
)

export default AppContainer
