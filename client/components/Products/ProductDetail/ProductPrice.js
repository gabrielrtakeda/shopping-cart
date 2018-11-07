import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const ProductPrice = ({ data: { sale, default: price } }) => (
  <Grid container xs={12} justify='space-between' alignItems='center'>
    <Grid item>
      {sale ? (
        <Typography variant='overline' color='secondary'>
          de {numeral(price).format('$ 0,0.00')}
        </Typography>
      ) : (
        <Typography variant='overline'>
          à vista de
        </Typography>
      )}
      <Typography variant='h3' paragraph>
        {sale
          ? numeral(sale).format('$ 0,0.00')
          : numeral(price).format('$ 0,0.00')
        }
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant='overline' color='textSecondary'>
        ou
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant='overline'>
        3x de
      </Typography>
      <Typography variant='h3' paragraph>
        {numeral((sale || price) / 3).format('$ 0,0.00')}
      </Typography>
    </Grid>
  </Grid>
)

const { shape, number } = PropTypes

ProductPrice.propTypes = {
  data: shape({
    sale: number,
    default: number
  }).isRequired
}

export default ProductPrice
