import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import { theme } from '../../services/material-ui/theme'
import AppBar from '../AppBar/AppBarComponent'
import CategoriesBar from '../CategoriesBar/CategoriesBarComponent'
import Layout from '../Layout'
import ProductCard from '../Products/ProductCard'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar />
        <CategoriesBar />

        <Layout>
          <div style={{
            width: '100%',
            height: 300,
            background: 'url(http://www.skinos-ilivatos.gr/images/headers/gastronomy-kefalonia.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            borderRadius: 8 / 2,
            marginBottom: 8 * 2,
            display: 'flex',
            overflow: 'hidden',
          }}>
            <div style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: `${8 * 4}px ${8 * 8}px`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography variant="h3" color='inherit' >
                BlackKnife
              </Typography>
              <Typography variant="h1" color='inherit'>
                50%
              </Typography>
              <Typography variant="h5" color='inherit'>
                de cashback
              </Typography>
            </div>
          </div>
          <Grid container xs={12} spacing={16}>
            {new Array(5).fill('').map((x, i) => (
              <Grid item>
                <ProductCard key={i} />
              </Grid>
            ))}
          </Grid>
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default App;
