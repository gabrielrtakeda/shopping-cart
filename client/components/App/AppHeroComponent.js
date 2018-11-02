import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

import Hero from '../Hero'

const styles = theme => ({
  root: {
    backgroundColor: '#000000',
    color: '#fff',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppHeroComponent = ({ classes }) => (
  <Hero image='https://goo.gl/C3K7g9'>
    <div className={classes.root}>
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
  </Hero>
);

export default withStyles(styles)(AppHeroComponent);
