import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    flexContainer: {
      justifyContent: 'center',
    }
  }
});

class CategoriesBar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            classes={classes.tabs}
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
          >
            <Tab label="Argentina" />
            <Tab label="Baiana" />
            <Tab label="Bebidas" />
            <Tab label="Cafeteria" />
            <Tab label="Carnes" />
            <Tab label="Casa de Sucos" />
            <Tab label="Comida Alemã" />
            <Tab label="Comida Árabe" />
            <Tab label="Comida Asiática" />
            <Tab label="Comida Brasileira" />
            <Tab label="Comida Contemporânea" />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

CategoriesBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriesBar);
