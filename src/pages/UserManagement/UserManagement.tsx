import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getAllUsers } from '../../services/userService';
import { User } from '../../types/User';
import Sidebar from '../../components/Sidebar/Sidebar'; 
import './UserManagement.css'; 
import Shell from '../../components/Shell/Shell';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Shell>
      <div className="user-management-container">
        <Sidebar />
        <div className="user-management-content">
          <Outlet context={{ users }} />
        </div>
      </div>
    </Shell>
  );
};

export default UserManagement;
