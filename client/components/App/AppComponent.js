import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

import AppBar from '../AppBar'
import AppHero from './AppHeroComponent'
import CategoriesBar from '../CategoriesBar/CategoriesBarContainer'
import Layout from '../Layout'
import ProductCard from '../Products/ProductCard'
import ProductCardList from '../Products/ProductCardList'

const AppComponent = ({ market }) => (
  <React.Fragment>
    <AppBar />
    <CategoriesBar market={market} />

    <Layout>
      <AppHero />

      <ProductCardList market={market} />
    </Layout>
  </React.Fragment>
);

AppComponent.propTypes = {
  market: PropTypes.object.isRequired,
}

export default AppComponent;
