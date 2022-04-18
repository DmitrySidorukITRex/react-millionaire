import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <div className="nav-list">
        <NavLink to="/" exact="true" className="nav-list-item">
          Главная
        </NavLink>
        <NavLink to="/rules" className="nav-list-item">
          Правила
        </NavLink>
        <NavLink to="/about" className="nav-list-item">
          История
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
