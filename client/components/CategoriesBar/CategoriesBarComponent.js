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
  render() {
    const { classes, market } = this.props;
    console.log('CategoriesBar', market);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            classes={classes.tabs}
            indicatorColor="primary"
            textColor="primary"
            scrollable
          >
            {market.categories.list.map(({ category }) => (
              <Tab
                key={category.id}
                label={category.name}
              />
            ))}
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
