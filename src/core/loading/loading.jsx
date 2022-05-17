import React from 'react';
import ReactDelayRender from 'react-delay-render';
import CircularProgress from '@mui/material/CircularProgress';
import classes from './loading.module.scss';

const Loading = () => {
  return <CircularProgress color="inherit" className={classes.loader} />;
};

export default ReactDelayRender({ delay: 0 })(Loading);
