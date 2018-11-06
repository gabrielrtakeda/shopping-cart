export const drawerWidth = 960;

export default theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: 20,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
    },
  },
  listContainer: {
    padding: theme.spacing.unit * 2,
  },
  listItemText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

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
  avatar: {
    width: theme.spacing.unit * 10,
    height: theme.spacing.unit * 10,
    borderRadius: theme.spacing.unit / 2,
  },
  totalSummary: {
    borderTop: '1px solid #efefef',
    borderBottom: '1px solid #efefef',
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
});
