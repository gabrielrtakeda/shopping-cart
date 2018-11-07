import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { CategoriesBarContext } from './CategoriesBarContext'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    flexContainer: {
      justifyContent: 'center'
    }
  }
})

const CategoriesBarComponent = ({ classes, market }) => (
  <div className={classes.root}>
    <CategoriesBarContext.Consumer>
      {({ setCategoryId, categoryId, refetchProducts }) => (
        <AppBar position='static' color='default'>
          <Tabs
            className={classes.tabs}
            indicatorColor='primary'
            onChange={(e, value) => {
              refetchProducts(value)
              setCategoryId(value)
            }}
            value={categoryId}
            textColor='primary'
            scrollable
          >
            <Tab label='Todos' value='all' />
            {market.categories.list.map(({ category }) => (
              <Tab
                key={category.id}
                value={category.id}
                label={category.name}
              />
            ))}
          </Tabs>
        </AppBar>
      )}
    </CategoriesBarContext.Consumer>
  </div>
)

const { object, shape, arrayOf, string } = PropTypes

CategoriesBarComponent.propTypes = {
  classes: object.isRequired,
  market: shape({
    categories: shape({
      list: arrayOf(shape({
        id: string,
        name: string
      }))
    })
  }).isRequired
}

export default withStyles(styles)(CategoriesBarComponent)
