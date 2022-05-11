import React, { useState } from 'react';
import classes from './auth.module.scss';
import Login from './login/login';
import Button from '@mui/material/Button';
import Register from './register/register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onCreateAccount = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={classes.component}>
      <div className={classes.left}>
        <img alt="auth-logo" src="/images/logo.png" />
      </div>
      <div className={classes.right}>
        <h2>Welcome to Millionaire</h2>
        {isLogin ? <Login /> : <Register />}
        <Button variant="text" className={classes['new-account']} onClick={onCreateAccount}>
          {isLogin ? 'New Millionaire? Create Account' : 'Have Account? Log In'}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
