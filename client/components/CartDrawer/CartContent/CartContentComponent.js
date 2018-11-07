import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import UpdateProductInTheCartMutation from '../../../mutations/UpdateProductInTheCartMutation'
import RemoveProductFromCartMutation from '../../../mutations/RemoveProductFromCartMutation';
import CartProduct from '../CartProduct'
import styles from './CartContentComponent.styles'

const containerProps = {
  container: true,
  spacing: 16,
  justify: 'space-between',
};

export const CartContentComponent = ({ classes, handleOpen, cart, relay }) => {
  const { environment } = relay;
  const subtotal = numeral(cart.totalItemsPrice).format('$ 0,0.00');

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
          updateProductInTheCartMutation={(...args) => {
            UpdateProductInTheCartMutation.commit(environment, ...args);
          }}
          removeProductFromCartMutation={(...args) => {
            RemoveProductFromCartMutation.commit(environment, ...args);
          }}
        />
      ))}

      <Typography variant='h6' paragraph>
        Resumo do pedido
      </Typography>
      <Grid {...containerProps}>
        <Grid item><Typography>Subtotal ({cart.totalItemsQuantity} produtos)</Typography></Grid>
        <Grid item><Typography>{subtotal}</Typography></Grid>
      </Grid>
      <Grid {...containerProps} className={classes.shipping}>
        <Grid item><Typography>Frete</Typography></Grid>
        <Grid item><Typography>-</Typography></Grid>
      </Grid>

      <Grid {...containerProps} alignItems='center' className={classes.totalSummary}>
        <Grid item><Typography variant='h4'>Total</Typography></Grid>
        <Grid item>
          <Typography variant='h5'>{subtotal}</Typography>
          <Typography variant='caption'>Em até 3x s/ juros</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const { object, func, bool, shape, number } = PropTypes;

CartContentComponent.propTypes = {
  classes: object.isRequired,
  handleOpen: func.isRequired,
  cart: shape({
    totalItemsQuantity: number,
    totalItemsPrice: number,
  }).isRequired,
  relay: object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CartContentComponent);
