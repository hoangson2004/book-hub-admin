import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', height: '100%' }}>
      <h1>Chào mừng bạn đến với Dashboard</h1>
      <p>
        Đây là giao diện chính của hệ thống. Vui lòng đăng nhập để truy cập các chức năng quản lý.
      </p>

      <div style={{ marginTop: '20px' }}>
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
