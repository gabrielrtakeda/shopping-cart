export default theme => ({
  itemWrapper: {
    marginBottom: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    borderBottom: '1px solid #efefef',
  },
  noBorder: {
    border: 'none',
  },
  itemsHeader: {
    display: 'none',
    paddingBottom: 0,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  headerGridItem: {
    width: theme.spacing.unit * 10,
    textAlign: 'center'
  },
  avatar: {
    width: theme.spacing.unit * 10,
    height: theme.spacing.unit * 10,
    borderRadius: theme.spacing.unit / 2,
  },
  textfield: {
    margin: 0,
    width: theme.spacing.unit * 10,
  },
  deleteButton: {
    marginTop: theme.spacing.unit * 1,
  },
  grow: {
    flex: 1,
  },
});
