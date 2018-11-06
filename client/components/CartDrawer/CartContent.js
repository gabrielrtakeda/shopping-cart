import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import styles from './CartContent.styles'

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const CartContent = ({ classes, handleOpen }) => (
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
    <Grid item className={classes.summary} xs={12}>
      <Typography variant="h6" className={classes.title} paragraph>
        Meu carrinho
      </Typography>
      <div className={classes.demo}>
        <Grid
          className={classnames(classes.itemWrapper, classes.itemsHeader)}
          container
          xs={12}
          spacing={16}
          alignItems='center'
        >
          <Grid item style={{ flex: 1 }}>
            <Typography>
              Produto
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container spacing={16} alignItems='center' justify='space-between'>
              <Grid item style={{ width: 8 * 10, textAlign: 'center' }}>
                <Typography>
                  Qtd.
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Preço
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {generate(
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
                    id="standard-uncontrolled"
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
        )}
      </div>

      <Typography variant="h6" className={classes.title} paragraph>
        Resumo do pedido
      </Typography>
      <Grid container spacing={16} justify='space-between'>
        <Grid item>
          <Typography>
            Subtotal (3 produtos)
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            R$ 1.799,94
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={16} justify='space-between' style={{ marginBottom: 8 * 2 }}>
        <Grid item>
          <Typography>
            Frete
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            -
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={16}
        justify='space-between'
        alignItems='center'
        className={classes.totalSummary}
      >
        <Grid item>
          <Typography variant="h4" className={classes.title}>
            Total
          </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
          <Typography variant='headline'>
            R$ 1.799,94
          </Typography>
          <Typography variant='caption'>
            Em até 10x s/ juros
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

const { object, func, bool } = PropTypes;

CartContent.propTypes = {
  classes: object.isRequired,
  handleOpen: func.isRequired,
};

export default withStyles(styles, { withTheme: true })(CartContent)
