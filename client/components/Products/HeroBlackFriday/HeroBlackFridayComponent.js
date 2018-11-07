import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Hero from '../../Hero'

const styles = theme => ({
  root: {
    color: '#fff',
    padding: `${theme.spacing.unit * 4}px 0`,
    position: 'relative',
    left: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const AppHeroComponent = ({ classes }) => (
  <Hero image='https://www.cervejariacolorado.com.br/img/site/topo-onde-encontrar.jpg'>
    <div className={classes.root}>
      <Typography variant='h3' color='inherit' >
        BlackFriday
      </Typography>
      <Typography variant='h1' color='inherit'>
        50%
      </Typography>
      <Typography variant='h5' color='inherit'>
        de cashback
      </Typography>
    </div>
  </Hero>
)

export default withStyles(styles)(AppHeroComponent)
