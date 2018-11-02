import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

class CartDrawerComponent extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, handleOpen, open } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Close drawer"
            onClick={() => handleOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor='right'
            variant="persistent"
            open={open}
          >
            {drawer}
          </Drawer>
        </nav>
      </div>
    );
  }
}

CartDrawerComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default CartDrawerComponent;
