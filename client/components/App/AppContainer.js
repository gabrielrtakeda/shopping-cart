import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../../services/relay/environment'
import AppComponent from './AppComponent'
import Loading from '../Loading'

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
    render={({ props }) => {
      return (
        props
          ? <AppComponent {...props} />
          : <Loading />
      )
    }}
  />
)

export default AppContainer
