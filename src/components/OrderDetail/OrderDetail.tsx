import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';
import { Order } from '../../types/Order';
import './OrderDetail.css';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (id) {
          const orderData = await getOrderById(id);
          setOrder(orderData);
        }
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="order-detail-container">
      <h2>Chi tiết đơn hàng</h2>
      <p><strong>Mã đơn hàng:</strong> {order._id}</p>
      <p><strong>Người dùng:</strong> {order.userId._id}</p>
      <p><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Trạng thái:</strong> {order.status}</p>
      <h3>Sản phẩm</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            <p><strong>Tên sách:</strong> {item.bookId.title}</p>
            <p><strong>Số lượng:</strong> {item.quantity}</p>
            <p><strong>Giá:</strong> {item.price} Coin</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
