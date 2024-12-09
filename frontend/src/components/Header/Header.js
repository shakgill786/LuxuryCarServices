import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import UserMenu from '../UserMenu/UserMenu';

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="logo">
        <img src="/logo.png" alt="Luxury Car Services" />
      </Link>
      <UserMenu />
    </header>
  );
}

export default Header;