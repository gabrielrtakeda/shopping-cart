import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const CartProductsComponent = ({ classes }) => (
  <Grid className={classes.itemWrapper} container xs={12} spacing={16} alignItems='center'>
    <Grid item>
      <Avatar
        src='https://c1.staticflickr.com/3/2786/4365953661_ff0f2ec418_b.jpg'
        className={classes.avatar}
      />
    </Grid>
    <Grid item style={{ flex: 1 }}>
      <ListItemText
        primary="Brouwerij De Sint-Sixtusabdij van Westvleteren Westvleteren 12 (XII)"
        secondary='Westvleteren, Belgium'
      />
    </Grid>
    <Grid item xs={12} md={3}>
      <Grid container spacing={16} alignItems='center' justify='space-between'>
        <Grid item style={{ textAlign: 'center' }}>
          <TextField
            defaultValue="foo"
            style={{ margin: 0, width: 8 * 10 }}
            margin="dense"
            type='number'
            defaultValue={1}
            inputProps={{
              min: 1,
              style: { textAlign: 'center' }
            }}
          />
          <div style={{ marginTop: 8 }}>
            <Button size='small'>
              remover
            </Button>
          </div>
        </Grid>
        <Grid item>
          <Typography>
            R$ 179,90
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const { object } = PropTypes;

CartProductsComponent.propTypes = {
  classes: object.isRequired,
};

export default CartProductsComponent
