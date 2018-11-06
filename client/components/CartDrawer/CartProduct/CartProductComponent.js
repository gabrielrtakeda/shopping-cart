import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class CartProductComponent extends React.Component {
  constructor(props) {
    super(props);
    const { data: { product, quantity } } = props;
    const productPrice = product.price.sale || product.price.default;

    this.state = {
      qty: quantity,
      subtotal: productPrice * quantity,
    };
  }

  handleChange = event => this.setState({ qty: Number(event.target.value) });

  handleClick = event => {
    if (this.validateQuantity(this.state.qty)) {
      this.props.mutation(
        ::this.updatePriceSubtotal,
        this.props.data.product.id,
        this.state.qty,
      );
    }
  };

  updatePriceSubtotal = (response) => {
    const { qty } = this.state
    const { data: { product } } = this.props;
    const subtotal = (product.price.sale || product.price.default) * qty;

    this.setState({ subtotal })
  };

  validateQuantity = qty => {
    const { data: { product, quantity } } = this.props;
    const total = product.quantity + quantity;

    return qty <= total && qty > 0;
  };

  render() {
    const { classes, data: { product, quantity } } = this.props;
    const { qty, subtotal } = this.state;

    return (
      <Grid className={classes.itemWrapper} container spacing={16} alignItems='center'>
        <Grid item>
          <Avatar
            src={product.image}
            className={classes.avatar}
          />
        </Grid>
        <Grid item className={classes.grow}>
          <ListItemText
            primary={product.name}
            secondary={product.category.name}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={16} alignItems='center' justify='space-between'>
            <Grid item>
              <TextField
                className={classes.textfield}
                inputProps={{
                  min: 1,
                  max: product.quantity + quantity,
                  style: { textAlign: 'center' },
                }}
                onChange={this.handleChange}
                error={!this.validateQuantity(qty)}
                margin='dense'
                type='number'
                defaultValue={qty}
              />
              <div className={classes.deleteButton}>
                <Button size='small' onClick={this.handleClick}>
                  atualizar
                </Button>
              </div>
            </Grid>
            <Grid item>
              <Typography>
                {numeral(subtotal).format('$ 0,0.00')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

const { object, number, shape, string, func } = PropTypes;

CartProductComponent.propTypes = {
  classes: object.isRequired,
  data: shape({
    quantity: number,
    product: shape({
      id: string,
      category: shape({ name: string }),
      quantity: number,
      price: shape({ default: number, sale: number }),
      name: string,
      image: string,
    }),
  }).isRequired,
  mutation: func.isRequired,
};

export default CartProductComponent
