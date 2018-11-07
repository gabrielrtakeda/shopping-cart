import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import styles from './SearchBarComponent.styles'

export const SearchBarComponent = ({ classes }) => (
  <div className={classes.search}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      placeholder='Search…'
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput
      }}
    />
  </div>
)

const { object } = PropTypes

SearchBarComponent.propTypes = {
  classes: object.isRequired
}

export default withStyles(styles)(SearchBarComponent)
