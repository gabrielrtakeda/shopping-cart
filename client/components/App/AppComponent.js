import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';

import AppBar from '../AppBar'
import AppHero from './AppHeroComponent'
import CategoriesBar from '../CategoriesBar/CategoriesBarContainer'
import Layout from '../Layout'
import ProductCard from '../Products/ProductCard'

const AppComponent = ({ market }) => (
  <React.Fragment>
    <AppBar />
    <CategoriesBar market={market} />

    <Layout>
      <AppHero />

      <Grid container xs={12} spacing={16}>
        {new Array(5).fill('').map((x, i) => (
          <Grid item>
            <ProductCard key={i} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  </React.Fragment>
);

AppComponent.propTypes = {
  market: PropTypes.object.isRequired,
}

export default AppComponent;
