import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../../services/orderService';  
import { Order } from '../../types/Order';
import './OrderDetail.css';

const OrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const [newStatus, setNewStatus] = useState<string>('');

    const statuses = ['Pending', 'Processing', 'Completed', 'Cancelled', 'Overdue', 'Returned'];

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (id) {
                    const orderData = await getOrderById(id);
                    setOrder(orderData);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const handleStatusChange = (status: string) => {
        setNewStatus(status);
        setIsMenuVisible(false);
    };

    const handleUpdateStatus = async () => {
        if (newStatus && order?._id) {
            try {
                await updateOrderStatus(order._id, newStatus);
                setOrder((prevOrder) => ({
                    ...prevOrder!,
                    status: newStatus,
                }));
                alert('Cập nhật trạng thái thành công!');
            } catch (error) {
                console.error('Lỗi khi cập nhật trạng thái:', error);
                alert('Cập nhật trạng thái thất bại!');
            }
        }
    };

    if (isLoading) {
        return <div>Đang tải...</div>;
    }

    if (!order) {
        return <div>Không tìm thấy đơn hàng</div>;
    }

    return (
        <div className="order-detail-container">
            <h2>Chi tiết đơn hàng</h2>

            <div className="order-info">
                <p><strong>Mã đơn hàng:</strong> {order._id}</p>
                <p><strong>Người dùng:</strong> <Link to={`/users/${order.userId}`}>{order.userId}</Link></p>
                <p><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Trạng thái: </strong>
                    <span className={`status-${order.status.toLowerCase()}`}>
                        {order.status}
                    </span>
                </p>
                <p><strong>Ngày hết hạn:</strong> {new Date(order.dueDate).toLocaleString()}</p>
            </div>

            <div className="status-update-container">
                <button onClick={() => setIsMenuVisible(!isMenuVisible)} className="status-update-button">
                    Cập nhật trạng thái
                </button>
                {isMenuVisible && (
                    <div className="status-menu">
                        {statuses.map((status) => (
                            <div key={status} className="status-option" onClick={() => handleStatusChange(status)}>
                                {status}
                            </div>
                        ))}
                    </div>
                )}
                {newStatus && (
                    <div className="selected-status">
                        <strong>Trạng thái mới:</strong> {newStatus}
                    </div>
                )}
                <button onClick={handleUpdateStatus} className="update-status-btn">
                    Xác nhận cập nhật
                </button>
            </div>

            <h3>Sản phẩm trong đơn hàng</h3>
            <ul>
                {order.items.map((item, index) => (
                    <li key={index} className="order-item">
                        <p><strong>Tên sách:</strong> <Link to={`/books/${item.bookId}`}>{item.bookId}</Link></p>
                        <p><strong>Số lượng:</strong> {item.quantity}</p>
                        <p><strong>Giá:</strong> {item.price} Coin</p>
                    </li>
                ))}
            </ul>

            <div className="order-payment-info">
                <p><strong>Tổng số tiền:</strong> {order.totalAmount} Coin</p>
                <p><strong>Tiền cọc:</strong> {order.depositAmount} Coin</p>
                <p><strong>Tiền thuê:</strong> {order.rentalAmount} Coin</p>
                <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
            </div>
        </div>
    );
};

export default OrderDetail;
