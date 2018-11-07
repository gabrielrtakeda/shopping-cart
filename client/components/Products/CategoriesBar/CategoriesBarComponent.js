import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { CategoriesBarContext } from './CategoriesBarContext'

function TabContainer (props) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

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

class CategoriesBarComponent extends React.Component {
  render () {
    const { classes, market } = this.props

    return (
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
  }
}

CategoriesBarComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CategoriesBarComponent)
