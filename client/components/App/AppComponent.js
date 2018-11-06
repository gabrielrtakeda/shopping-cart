import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '../AppBar'
import ProductCardList from '../Products/ProductCardList'

const AppComponent = props => {
  const { market, cart } = props

  return (
    <React.Fragment>
      <AppBar cart={cart} />
      <ProductCardList market={market} />
    </React.Fragment>
  );
}

AppComponent.propTypes = {
  market: PropTypes.object.isRequired,
}

export default AppComponent;
