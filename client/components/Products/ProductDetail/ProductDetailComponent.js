import React from 'react';
import numeral from 'numeral';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import ProductPrice from './ProductPrice'

class ProductDetailComponent extends React.Component {
  state = {
    quantity: 1,
  };

  handleChange = event => {
    this.setState({ quantity: event.target.value });
  };

  render() {
    const { open, handleClose, market } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='body'
        aria-labelledby="scroll-dialog-title"
      >
        {!market ? 'Loading...' : (
          <React.Fragment>
            <div style={{
              width: '100%',
              paddingTop: '56.25%',
              backgroundImage: `url(${market.product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }} />
            <DialogTitle id="scroll-dialog-title">
              {market.product.name}
            </DialogTitle>

            <DialogContent>
              <ProductPrice data={market.product.price} />

              <Typography variant='subtitle1' paragraph>
                {market.product.description}
              </Typography>

              {market.product.attributes.map(attribute => (
                <Typography color="textSecondary">
                  {attribute}
                </Typography>
              ))}

              {market.product.quantity > 0 ? (
                <Grid container xs={12} spacing={8} alignItems='center' style={{ marginTop: 8 * 4 }}>
                  <Grid item xs={4}>
                    <TextField
                      id="standard-full-width"
                      label="Quantidade"
                      type='number'
                      fullWidth
                      inputProps={{ max: market.product.quantity }}
                      defaultValue={this.state.quantity}
                      value={this.state.quantity}
                      onChange={::this.handleChange}
                      error={this.state.quantity > market.product.quantity}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={this.state.quantity > market.product.quantity}
                      fullWidth
                    >
                      <ShoppingCartIcon />
                      Adicionar ao carrinho
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid container alignItems='center' justify='center' style={{ marginTop: 8 * 4 }}>
                  <Grid item>
                    <Typography variant='h6' color="secondary" gutterBottom style={{ marginRight: 8 }}>
                      Sem estoque
                    </Typography>
                  </Grid>
                  <Grid item>
                    <MoodBadIcon color='secondary' />
                  </Grid>
                </Grid>
              )}
            </DialogContent>
          </React.Fragment>
        )}
      </Dialog>
    );
  }
}

export default ProductDetailComponent;
