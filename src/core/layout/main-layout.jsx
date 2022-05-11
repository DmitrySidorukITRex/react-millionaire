import React from 'react';
import classes from './main-layout.module.scss';
import Header from '../header/header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
