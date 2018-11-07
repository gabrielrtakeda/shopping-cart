import React from 'react'
import PropTypes from 'prop-types'
import md5 from 'md5'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import ProductPrice from './ProductPrice'
import ProductBuyAction from '../ProductBuyAction'

class ProductDetailComponent extends React.Component {
  render () {
    const { open, handleClose, market } = this.props
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='body'
        aria-labelledby='scroll-dialog-title'
      >
        {!market ? 'Loading...' : (
          <React.Fragment>
            <div style={{
              width: '100%',
              paddingTop: '56.25%',
              backgroundImage: `url(${market.product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }} />
            <DialogTitle id='scroll-dialog-title'>
              {market.product.name}
            </DialogTitle>

            <DialogContent>
              <ProductPrice data={market.product.price} />

              <Typography variant='subtitle1' paragraph>
                {market.product.description}
              </Typography>

              {market.product.attributes.map(attribute => (
                <Typography key={`${market.product.id}${md5(attribute)}`} color='textSecondary'>
                  {attribute}
                </Typography>
              ))}

              <ProductBuyAction data={market.product} />
            </DialogContent>
          </React.Fragment>
        )}
      </Dialog>
    )
  }
}

const { bool, func, shape, arrayOf, string, number } = PropTypes

ProductDetailComponent.propTypes = {
  open: bool.isRequired,
  handleClose: func.isRequired,
  market: shape({
    product: shape({
      attributes: arrayOf(string),
      description: string,
      id: string,
      image: string,
      name: string,
      price: shape({
        default: number,
        sale: number
      })
    })
  }).isRequired
}

export default ProductDetailComponent
