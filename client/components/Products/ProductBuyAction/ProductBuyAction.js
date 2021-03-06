import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import MoodBadIcon from '@material-ui/icons/MoodBad'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import environment from '../../../services/relay/environment'
import mutation from '../../../mutations/UpdateProductInTheCartMutation'

class ProductBuyAction extends React.Component {
  state = {
    qty: 1
  };

  handleChange = event => this.setState({ qty: Number(event.target.value) });
  handleClick = event => mutation.commit(
    environment,
    ::this.resetQty,
    this.props.data.id,
    this.state.qty,
    true
  );
  resetQty = () => this.setState({ qty: 1 });

  render () {
    const { classes, data: { quantity }, noMargin } = this.props
    const { qty } = this.state
    const containerClass = noMargin ? classes.noMargin : classes.container
    const quantityValidation = qty > quantity || qty < 1

    return quantity > 0 ? (
      <Grid className={containerClass} container spacing={8} alignItems='center'>
        <Grid item xs={4}>
          <TextField
            className={classes.textfield}
            id='standard-full-width'
            label='Quantidade'
            type='number'
            fullWidth
            inputProps={{ max: quantity, min: 1, style: { textAlign: 'center' } }}
            value={qty}
            onChange={this.handleChange}
            error={quantityValidation}
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            variant='contained'
            color='primary'
            disabled={quantityValidation}
            fullWidth
            onClick={this.handleClick}
          >
            <ShoppingCartIcon className={classes.shoppingCartIcon} />
            Adicionar ao carrinho
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid className={containerClass} container alignItems='center' justify='center'>
        <Grid item>
          <Typography
            className={classes.outStock}
            variant='h6'
            color='secondary'
          >
            Produto esgotado
          </Typography>
        </Grid>
        <Grid item>
          <MoodBadIcon color='secondary' />
        </Grid>
      </Grid>
    )
  }
}

const { object, shape, string, number, arrayOf, bool } = PropTypes

ProductBuyAction.propTypes = {
  classes: object.isRequired,
  data: shape({
    id: string,
    name: string,
    categoryId: number,
    attributes: arrayOf(string),
    image: string,
    description: string,
    quantity: number
  }).isRequired,
  noMargin: bool
}

export default ProductBuyAction
