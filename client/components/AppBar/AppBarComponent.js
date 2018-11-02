import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import CartDrawer from '../CartDrawer/CartDrawerComponent'
import SearchBar from './SearchBarComponent'

class AppBarComponent extends React.Component {
  state = {
    openCartDrawer: false,
  };

  handleCartDrawerOpen = openCartDrawer => {
    this.setState({ openCartDrawer });
  };

  render() {
    const { classes } = this.props;
    const { openCartDrawer } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <RestaurantIcon />
            </IconButton>

            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              JusMarket
            </Typography>

            <SearchBar />

            <div className={classes.shoppingCartMenu}>
              <IconButton color="inherit" onClick={this.handleCartDrawerOpen}>
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <CartDrawer
          open={openCartDrawer}
          handleOpen={this.handleCartDrawerOpen}
        />
      </div>
    );
  }
}

export default AppBarComponent;
