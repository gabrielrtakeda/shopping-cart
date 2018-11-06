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
  drawerPaper: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
    },
  },
});
