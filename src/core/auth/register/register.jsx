import React from 'react';
import classes from './register.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { signUp } from '../auth.service.js';
import { useAuthError } from '../../../store/slices/auth/selectors';
import { useAppDispatch } from '../../../store/store';
import { signup } from '../../../store/slices/auth/thunks';

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authError = useAuthError();

  const onSubmit = (data) => {
    dispatch(signup(data)).then((res) => {
      if (res.payload.token) navigate('/game');
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.control}>
        <TextField
          className={classes.input}
          label="First Name"
          variant="outlined"
          {...register('firstName', { required: 'First Name is required.' })}
        />
        {errors.firstName?.type === 'required' && <span className={classes.error}>{errors.firstName.message}</span>}
      </div>

      <div className={classes.control}>
        <TextField
          className={classes.input}
          label="Last Name"
          variant="outlined"
          {...register('lastName', { required: 'Last Name is required.' })}
        />
        {errors.lastName?.type === 'required' && <span className={classes.error}>{errors.lastName.message}</span>}
      </div>

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

      <div className={classes.authError}>{authError?.message}</div>

      <Button className={classes.button} variant="contained" color="success" type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default Register;
