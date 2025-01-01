import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar: React.FC = () => {
  const location = useLocation(); // Dùng useLocation để lấy đường dẫn hiện tại

  return (
    <div className="sidebar">
      <h3>Quản lý</h3>
      <ul>
        <li>
          <Link 
            to="/books" 
            className={location.pathname.startsWith('/books') ? 'active' : ''}
          >
            Quản lý truyện
          </Link>
        </li>
        <li>
          <Link 
            to="/users" 
            className={location.pathname.startsWith('/users') ? 'active' : ''}
          >
            Quản lý người dùng
          </Link>
        </li>
        <li>
          <Link 
            to="/orders" 
            className={location.pathname === '/orders' ? 'active' : ''}
          >
            Quản lý đơn hàng
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
