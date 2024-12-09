import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './UserMenu.css';

function UserMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="user-menu">
      {sessionUser ? (
        <div>
          <button onClick={() => setShowMenu(!showMenu)}>Hello, {sessionUser.firstName}</button>
          {showMenu && (
            <ul>
              <li>{sessionUser.email}</li>
              <li>
                <button onClick={handleLogout}>Log out</button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div>
          <button>Log in</button>
          <button>Sign up</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;