import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { User } from '../../types/User';
import './UserList.css';

const UserList: React.FC = () => {
    const { users } = useOutletContext<{ users: User[] }>();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        filterUsers(searchTerm);
    }, [users]);

    const handleNavigateToHistory = (userId: string) => {
        navigate(`/users/${userId}/history`);
    };

    const handleNavigateToDetail = (userId: string) => {
        navigate(`/users/${userId}`);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        filterUsers(term);
    };

    const filterUsers = (term: string) => {
        const normalizedTerm = term.toLowerCase();
        const filtered = users.filter(
            (user) =>
                user._id.toLowerCase().includes(normalizedTerm) ||
                user.username.toLowerCase().includes(normalizedTerm) ||
                user.email.toLowerCase().includes(normalizedTerm) ||
                user.phoneNumber?.toLowerCase().includes(normalizedTerm)
        );
        setFilteredUsers(filtered);
    };

    if (!users || users.length === 0) {
        return <div className="no-users">Không có người dùng nào để hiển thị.</div>;
    }

    return (
        <div className="user-list">
            <div className="header-container">
                <h2>Danh sách người dùng</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo ID, tên, email, số điện thoại..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber || 'N/A'}</td>
                            <td>
                                <button onClick={() => handleNavigateToDetail(user._id)}>
                                    Chi tiết
                                </button>
                                <button
                                    onClick={() => handleNavigateToHistory(user._id)}
                                    className="last-button"
                                >
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
