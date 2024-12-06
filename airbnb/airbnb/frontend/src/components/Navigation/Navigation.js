import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  return (
    <nav>
      <div className="nav-logo">
        <NavLink to="/">Luxury Rentals</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;