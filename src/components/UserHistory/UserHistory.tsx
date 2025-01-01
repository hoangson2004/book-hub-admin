import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrdersByUserId } from '../../services/orderService';
import { Order } from '../../types/Order';

const UserHistory: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();  
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrdersByUserId(userId);
                setOrders(response);
                setIsLoading(false);
            } catch (error) {
                setError('Không thể lấy lịch sử đơn hàng');
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (isLoading) {
        return <div>Đang tải lịch sử...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lịch sử mua hàng</h2>
            {orders.length === 0 ? (
                <p>Không có đơn hàng nào</p>
            ) : (
                <ul style={{ paddingLeft: '20px' }}>
                    {orders.map((order) => (
                        <li key={order._id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                            <p><strong>Mã đơn hàng:</strong> {order._id}</p>
                            <p><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            <p><strong>Trạng thái:</strong> {order.status}</p>
                            <p><strong>Tổng số tiền:</strong> {order.totalAmount} Coin</p>
                            <Link 
                                to={`/orders/${order._id}`} 
                                style={{ 
                                    padding: '8px 15px', 
                                    backgroundColor: '#2196f3', 
                                    color: '#fff', 
                                    textDecoration: 'none', 
                                    borderRadius: '5px', 
                                    marginTop: '10px',
                                    display: 'inline-block'
                                }}
                            >
                                Xem chi tiết
                            </Link>
                            <p style={{ marginTop: '10px' }}><strong>Người dùng:</strong> <Link to={`/users/${order.userId._id}`}>{order.userId._id}</Link></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserHistory;
