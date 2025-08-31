import React from 'react';
import './Header.css';
import headerImg from '../assets/Header.jpg';

const Header = () => {
  return (
    <div className="header-container" style={{ backgroundImage: `url(${headerImg})` }}>
      <div className="header-overlay"></div>
      <div className="header-content">
        <h1>¡Pizzería Mamma Mia!</h1>
        <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
        <hr className="header-hr" />
      </div>
    </div>
  );
};

export default Header;
