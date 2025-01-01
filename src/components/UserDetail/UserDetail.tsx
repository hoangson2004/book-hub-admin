import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../services/userService';
import { User } from '../../types/User';
import './UserDetail.css';

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId || '');
        setUser(userData);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  if (!user) return <div>Đang tải...</div>;

  return (
    <div className="user-detail-container">
      <h2>Chi tiết người dùng</h2>
      <div className="user-detail">
        <p><strong>UserID:</strong> {user._id}</p>
        <p><strong>Tên người dùng:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Số điện thoại:</strong> {user.phoneNumber}</p>
        <p><strong>Ngày sinh:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Vai trò:</strong> {user.role}</p>
        <p><strong>Ngày tạo:</strong> {new Date(user.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default UserDetail;
