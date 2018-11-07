export default theme => ({
  root: {
    width: '100%'
  },
  menuButton: {
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    marginRight: theme.spacing.unit * 3
  },
  shoppingCartMenu: {
    marginLeft: theme.spacing.unit * 3
  }
})
