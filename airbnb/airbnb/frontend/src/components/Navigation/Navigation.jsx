import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navigation">
      <div className="nav-left">
        <Link to="/">
          <h1>Luxury Stays</h1>
        </Link>
      </div>
      <div className="nav-right">
        {sessionUser ? (
          <>
            <Link to="/spots/new" className="create-spot-button">
              Create Spot
            </Link>
            <ProfileButton user={sessionUser} />
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-button">
              Log In
            </Link>
            <Link to="/signup" className="signup-button">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;