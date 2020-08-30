import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootPage: {
    marginTop: 50,
    [theme.breakpoints.down('sm')]: {
      marginTop: 95,
    },
  },
  paper: {
    backgroundColor: '#b23137',
    padding: 16,
  },
  tab: {
    minWidth: 120,
    [theme.breakpoints.down('sm')]: {
      minWidth: 60,
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 50,
    },
  },
  tabIcon: {
    fontSize: 45,
    [theme.breakpoints.down('sm')]: {
      fontSize: 35,
    },
  },
}));

export default useStyles;
