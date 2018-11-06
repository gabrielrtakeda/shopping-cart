import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CartProducts from '../CartProducts'

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const containerProps = {
  container: true,
  spacing: 16,
  justify: 'space-between',
};

const CartContent = ({ classes, handleOpen }) => (
  <Grid item className={classes.summary} xs={12}>
    <Typography variant='h6' paragraph>
      Meu carrinho
    </Typography>
    <CartProducts.Header />
    {generate(<CartProducts />)}

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

const { object, func, bool } = PropTypes;

CartContent.propTypes = {
  classes: object.isRequired,
  handleOpen: func.isRequired,
};

export default CartContent;
