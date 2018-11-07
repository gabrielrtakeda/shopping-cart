import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const CartProductHeader = ({ classes }) => (
  <Grid
    className={classnames(classes.itemWrapper, classes.itemsHeader)}
    container
    spacing={16}
    alignItems='center'
  >
    <Grid item className={classes.grow}>
      <Typography>
        Produto
      </Typography>
    </Grid>
    <Grid item xs={12} md={4}>
      <Grid container spacing={16} alignItems='center' justify='space-between'>
        <Grid item className={classes.headerGridItem}>
          <Typography>
            Qtd.
          </Typography>
        </Grid>
        <Grid item className={classes.headerGridItem}>
          <Typography>
            Preço
          </Typography>
        </Grid>
        <Grid item className={classes.headerGridItem}>
          <Typography>
            Remover
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

const { object } = PropTypes

CartProductHeader.propTypes = {
  classes: object.isRequired
}

export default CartProductHeader
