import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import UpdateProductInTheCartMutation from '../../../mutations/UpdateProductInTheCartMutation'
import CartProduct from '../CartProduct'
import styles from './CartContentComponent.styles'

const containerProps = {
  container: true,
  spacing: 16,
  justify: 'space-between',
};

export const CartContentComponent = ({ classes, handleOpen, cart, relay }) => {
  return (
    <Grid item className={classes.summary} xs={12}>
      <Typography variant='h6' paragraph>
        Meu carrinho
      </Typography>
      <CartProduct.Header />
      {cart && cart.items.list.map(({ item }) => (
        <CartProduct
          key={item.id}
          data={item}
          mutation={(...args) => UpdateProductInTheCartMutation.commit(relay.environment, ...args)}
        />
      ))}

      <Typography variant='h6' paragraph>
        Resumo do pedido
      </Typography>
      <Grid {...containerProps}>
        <Grid item><Typography>Subtotal (3 produtos)</Typography></Grid>
        <Grid item><Typography>R$ 1.799,94</Typography></Grid>
      </Grid>
      <Grid {...containerProps} style={{ marginBottom: 8 * 2 }}>
        <Grid item><Typography>Frete</Typography></Grid>
        <Grid item><Typography>-</Typography></Grid>
      </Grid>

      <Grid {...containerProps} alignItems='center' className={classes.totalSummary}>
        <Grid item><Typography variant='h4'>Total</Typography></Grid>
        <Grid item>
          <Typography variant='headline'>R$ 1.799,94</Typography>
          <Typography variant='caption'>Em até 10x s/ juros</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const { object, func, bool } = PropTypes;

CartContentComponent.propTypes = {
  classes: object.isRequired,
  handleOpen: func.isRequired,
  cart: object.isRequired,
  relay: object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CartContentComponent);
