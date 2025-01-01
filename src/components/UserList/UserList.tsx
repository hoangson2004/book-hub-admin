import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/userService'; // API lấy danh sách người dùng
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/User'; // Import type User
import './UserList.css'; // Import CSS

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách người dùng:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleViewDetail = (id: string) => {
        navigate(`/users/${id}`); // Điều hướng đến trang chi tiết người dùng
    };

    const handleViewHistory = (id: string) => {
        navigate(`/users/${id}/history`); // Điều hướng đến trang lịch sử mua hàng
    };

    return (
        <div className="user-list-container">
            <h2>Danh sách người dùng</h2>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleViewDetail(user.id)} className="btn btn-primary">
                                    Chi tiết
                                </button>
                                <button onClick={() => handleViewHistory(user.id)} className="btn btn-secondary">
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
