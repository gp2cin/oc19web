import React from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    minHeight: 'fit-content',
  },

  name: {
    fontSize: '16px',
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;
  let name = localStorage.getItem('NAME');

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography className={classes.name} variant="h5">
        Olá, {name}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
