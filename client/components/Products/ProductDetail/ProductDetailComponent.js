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
import ProductBuyAction from '../ProductBuyAction'

class ProductDetailComponent extends React.Component {

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

              <ProductBuyAction data={market.product} />
            </DialogContent>
          </React.Fragment>
        )}
      </Dialog>
    );
  }
}

export default ProductDetailComponent;
