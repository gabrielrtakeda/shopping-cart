import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

class Layout extends React.Component {
  render () {
    const { classes, children } = this.props

    return (
      <Grid container className={classes.root} justify='center'>
        <Grid item className={classes.holder} xs={12}>
          {children}
        </Grid>
      </Grid>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default Layout
