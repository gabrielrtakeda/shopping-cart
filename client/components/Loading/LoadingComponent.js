import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import styles from './LoadingComponent.styles'

const LoadingComponent = ({ classes }) => (
  <div className={classes.root}>
    <img src='/logo.png' />
    <Typography>
      Carregando...
    </Typography>
  </div>
)

const { object } = PropTypes

LoadingComponent.propTypes = {
  classes: object.isRequired
}

export default withStyles(styles)(LoadingComponent)
