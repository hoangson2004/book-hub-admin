import React from 'react';
import './Dashboard.css';  
const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>Chào mừng bạn đến với The Book Hub Dashboard</h1>
      <p>
        Đây là giao diện chính của hệ thống. Vui lòng đăng nhập để truy cập các chức năng quản lý.
      </p>

      <div className="functions-container">
        <h3>Các chức năng:</h3>
        <ul>
          <li>Quản lý sách</li>
          <li>Quản lý người dùng</li>
          <li>Quản lý đơn hàng</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
