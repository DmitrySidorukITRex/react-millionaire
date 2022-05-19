import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { logout } from '../../store/slices/auth/slice';

const Header = () => {
  const dispatch = useAppDispatch();

  const onLogout = () => dispatch(logout());
  return (
    <div className="header">
      <div className="nav-list">
        <NavLink to="/game" exact="true" className="nav-list-item">
          Главная
        </NavLink>
        <NavLink to="/rating" exact="true" className="nav-list-item">
          Рейтинг
        </NavLink>
        <NavLink to="/rules" className="nav-list-item">
          Правила
        </NavLink>
        <NavLink to="/about" className="nav-list-item">
          История
        </NavLink>
      </div>
      <div className="logout" onClick={onLogout}>
        Logout
      </div>
    </div>
  );
};

export default Header;
