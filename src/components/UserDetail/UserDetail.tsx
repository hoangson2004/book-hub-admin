import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser, deleteUser } from '../../services/userService'; // API
import { UserUpdatePayload, User } from '../../types/User'; // Import types
import './UserDetail.css'; // Import CSS

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserUpdatePayload>({
    username: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserById(id || '');
        setUser(userDetails);
        setFormData({
          username: userDetails.username,
          email: userDetails.email,
        });
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    if (id) fetchUserDetails();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(id || '', formData);
      console.log('Người dùng đã được cập nhật:', updatedUser);
      navigate('/users');
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
    if (!confirmDelete) return;

    try {
      await deleteUser(id || '');
      console.log('Người dùng đã bị xóa');
      navigate('/users');
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
    }
  };

  if (!user) return <div>Đang tải...</div>;

  return (
    <div className="user-detail-container">
      <h2>Chi tiết người dùng</h2>
      <form onSubmit={handleUpdate} className="user-detail-form">
        <div>
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Cập nhật</button>
          <button type="button" onClick={handleDelete} className="btn btn-danger">Xóa</button>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
