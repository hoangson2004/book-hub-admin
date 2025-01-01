import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Order } from '../../types/Order';
import './OrderList.css';

const OrderList: React.FC = () => {
  const { orders } = useOutletContext<{ orders: Order[] }>();
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setFilteredOrders(sortedOrders);
  }, [orders]);

  const handleNavigateToDetail = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  const handleFilterByStatus = (status: string) => {
    setSelectedStatus(status);
    filterOrders(status, searchTerm);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterOrders(selectedStatus, term);
  };

  const filterOrders = (status: string, term: string) => {
    const normalizedTerm = term.toLowerCase();
    let filtered = [...orders];

    if (status) {
      filtered = filtered.filter((order) => order.status === status);
    }

    if (term) {
      filtered = filtered.filter(
        (order) =>
          order._id.toLowerCase().includes(normalizedTerm) ||
          order.userId.email.toLowerCase().includes(normalizedTerm) ||
          new Date(order.createdAt)
            .toLocaleDateString()
            .toLowerCase()
            .includes(normalizedTerm)
      );
    }

    filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredOrders(filtered);
  };

  if (!orders || orders.length === 0) {
    return <div className="no-orders">Không có đơn hàng nào để hiển thị.</div>;
  }

  return (
    <div className="order-list-container">
      <div className="header-container">
        <h2>Danh sách đơn hàng</h2>
        <div className="filter-container">
          <label htmlFor="statusFilter">Lọc theo trạng thái: </label>
          <select
            id="statusFilter"
            value={selectedStatus}
            onChange={(e) => handleFilterByStatus(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="Pending">Đang chờ</option>
            <option value="Processing">Đang xử lý</option>
            <option value="Completed">Hoàn thành</option>
            <option value="Cancelled">Đã Hủy</option>
            <option value="Overdue">Quá hạn</option>
          </select>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn, người dùng, ngày tạo..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

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
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId.email}</td>
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
