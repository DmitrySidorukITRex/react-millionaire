import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth.service.js';
import classes from './login.module.scss';

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = ({ email, password }) => {
    login(email, password).then((res) => {
      if (res) navigate('/game');
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.control}>
        <TextField
          className={classes.input}
          label="Email"
          variant="outlined"
          {...register('email', { required: 'Email is required.', pattern: /^\S+@\S+\.\S+$/ })}
        />
        {errors.email?.type === 'required' && <span className={classes.error}>Email is required</span>}
        {errors.email?.type === 'pattern' && <span className={classes.error}>Email is not valid</span>}
      </div>

      <div className={classes.control}>
        <TextField
          className={classes.input}
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="true"
          {...register('password', { required: 'Password is required.' })}
        />
        {errors.password?.type === 'required' && <span className={classes.error}>Password is required</span>}
      </div>

      <Button className={classes.button} variant="contained" color="success" type="submit">
        Sign In
      </Button>
    </form>
  );
};

export default Login;
