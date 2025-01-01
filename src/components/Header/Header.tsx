import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../provider/AuthContext';

const Header: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="header-logo">
                    <img src="/images/logo.png" alt="Logo" className="logo" />
                </Link>
            </div>

            <div className="header-right">
                {isAuthenticated ? (
                    <div className="auth-container">
                        <img
                            src="/images/avatar.png"
                            alt="User Avatar"
                            className="avatar-image"
                        />
                        <button onClick={logout} className="auth-button">
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    <div className="auth-container">
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
