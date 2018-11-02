import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';

import AppBar from '../AppBar/AppBarComponent'
import CategoriesBar from '../CategoriesBar/CategoriesBarContainer'
import Layout from '../Layout'
import ProductCard from '../Products/ProductCard'
import AppHeroComponent from './AppHeroComponent'

const AppComponent = ({ market }) => (
  <React.Fragment>
    <AppBar />
    <CategoriesBar market={market} />

    <Layout>
      <AppHeroComponent />

      <Grid container xs={12} spacing={16}>
        {new Array(5).fill('').map((x, i) => (
          <Grid item>
            <ProductCard key={i} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  </React.Fragment>
)

export default AppComponent;
