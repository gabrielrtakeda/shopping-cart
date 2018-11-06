import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';

import CartContent from './CartContent';

class CartDrawerComponent extends React.Component {
  render() {
    const { classes, handleOpen, open } = this.props;

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
            <CartContent handleOpen={handleOpen} />
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
  open: bool.isRequire
};

export default CartDrawerComponent;
