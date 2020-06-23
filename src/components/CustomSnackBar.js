import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// possibleTypes:  ['error', 'warning', 'info', 'success']

export default function CustomSnackBar({ open, setOpen, message, type = 'success' }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={100000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
