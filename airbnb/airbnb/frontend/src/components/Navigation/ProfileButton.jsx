import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();

  const toggleMenu = () => setShowMenu((prevState) => !prevState);

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (!showMenu) return;

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  return (
    <div className="profile-button">
      <button onClick={toggleMenu}>
        {user.firstName} <span>&#9660;</span>
      </button>
      {showMenu && (
        <ul className="dropdown-menu" ref={ulRef}>
          <li>
            <button onClick={() => history.push('/profile')}>Profile</button>
          </li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;