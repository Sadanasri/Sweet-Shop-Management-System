import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          Sweet Shop
        </Link>
        <div className="nav-links">
          <Link to="/cart" className="nav-link">
            Cart ({totalItems})
          </Link>
          {user ? (
            <>
              <span className="user-info">Hi, {user.name}</span>
              <Link to="/orders" className="nav-link">My Orders</Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
