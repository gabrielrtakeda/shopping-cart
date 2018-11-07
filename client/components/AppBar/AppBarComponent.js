import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import CartDrawer from '../CartDrawer'
import SearchBar from './SearchBarComponent'

class AppBarComponent extends React.Component {
  state = {
    openCartDrawer: false
  };

  handleCartDrawerOpen = openCartDrawer => {
    this.setState({ openCartDrawer })
  };

  render () {
    const { classes, market } = this.props
    const { openCartDrawer } = this.state

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton className={classes.menuButton} color='inherit'>
              <RestaurantIcon />
            </IconButton>

            <Typography className={classes.title} variant='h6' color='inherit' noWrap>
              JusTbeer
            </Typography>

            <SearchBar />

            <div className={classes.shoppingCartMenu}>
              <IconButton color='inherit' onClick={() => this.handleCartDrawerOpen(true)}>
                {market.cart.totalItemsQuantity > 0 ? (
                  <Badge badgeContent={market.cart.totalItemsQuantity} color='secondary'>
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  <ShoppingCartIcon />
                )}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <CartDrawer
          market={market}
          open={openCartDrawer}
          handleOpen={this.handleCartDrawerOpen}
        />
      </div>
    )
  }
};

const { object } = PropTypes

AppBarComponent.propTypes = {
  classes: object.isRequired,
  market: object.isRequired
}

export default AppBarComponent
