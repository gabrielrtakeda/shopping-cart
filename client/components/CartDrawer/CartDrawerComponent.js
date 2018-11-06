import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import styles from './CartDrawerComponent.styles';
import CartContent from './CartContent';

class CartDrawerComponent extends React.Component {
  render() {
    const { classes, handleOpen, open, market } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.drawer}>
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            anchor='right'
            variant="persistent"
            open={open}
          >
            <div className={classes.toolbar}>
              <IconButton
                className={classes.close}
                color='inherit'
                onClick={() => handleOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <Divider />
            <CartContent handleOpen={handleOpen} cart={market.cart} />
          </Drawer>
        </div>
      </div>
    );
  }
}

const { object, func, bool } = PropTypes;

CartDrawerComponent.propTypes = {
  classes: object.isRequired,
  handleOpen: func.isRequired,
  open: bool.isRequired,
  market: object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CartDrawerComponent);
