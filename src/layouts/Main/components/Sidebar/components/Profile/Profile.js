import React from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },

  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;
  // const user = localStorage.getItem('')
  const classes = useStyles();

  const user = {
    name: 'Shen Zhi',
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography className={classes.name} variant="h4">
        Olá, {user.name}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
