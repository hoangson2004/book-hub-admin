import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { User } from '../../types/User';
import './UserList.css';

const UserList: React.FC = () => {
  const { users } = useOutletContext<{ users: User[] }>();
  const navigate = useNavigate();

  const handleNavigateToHistory = (id: string) => {
    navigate(`/users/${id}/history`);
  };

  const handleNavigateToDetail = (id: string) => {
    navigate(`/users/${id}`);
  };

  if (!users || users.length === 0) {
    return <div className="no-users">Không có người dùng nào để hiển thị.</div>;
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>Danh sách người dùng</h3>
      </div>

      <table className="user-list-table">
        <thead>
          <tr>
            <th>UserID</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleNavigateToDetail(user._id)}>
                  Chi tiết
                </button>
                <button onClick={() => handleNavigateToHistory(user._id)} className="last-button">
                  Lịch sử mua hàng
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
