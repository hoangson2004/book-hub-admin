import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Order } from '../../types/Order';
import './OrderList.css';

const OrderList: React.FC = () => {
  const { orders } = useOutletContext<{ orders: Order[] }>();
  const navigate = useNavigate();

  const handleNavigateToDetail = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  if (!orders || orders.length === 0) {
    return <div className="no-orders">Không có đơn hàng nào để hiển thị.</div>;
  }

  return (
    <div className="order-list-container">
      <h2>Danh sách đơn hàng</h2>
      <table className="order-list-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Người dùng</th>
            <th>Ngày tạo</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId._id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleNavigateToDetail(order._id)}>
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
