import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../provider/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src="/images/home.webp" alt="Logo" className="logo" />
        <h1>Admin Dashboard</h1>
      </Link>

      <div className="header-auth">
        {isAuthenticated ? (
          <div className="right-button">
            <div className="user-avatar-container">
              <button className="avatar-button" onClick={toggleMenu}>
                <img src="/images/avatar.png" alt="User Avatar" className="avatar-image" />
              </button>
              {isMenuOpen && (
                <div className="avatar-menu">
                  <button onClick={logout} className="menu-item">
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="right-button">
            <Link to="/sign-in">
              <button className="auth-button">Đăng nhập</button>
            </Link>
            <Link to="/sign-up">
              <button className="auth-button">Đăng ký</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
