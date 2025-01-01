import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getAllOrders } from '../../services/orderService';
import { Order } from '../../types/Order';
import Sidebar from '../../components/Sidebar/Sidebar';
import Shell from '../../components/Shell/Shell';
import './OrderManagement.css';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Shell>
      <div className="order-management-container">
        <Sidebar />
        <div className="order-management-content">
          <Outlet context={{ orders }} />
        </div>
      </div>
    </Shell>
  );
};

export default OrderManagement;
