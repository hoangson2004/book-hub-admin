import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../provider/AuthContext'; 
import Shell from '../../components/Shell/Shell';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard'; 
import BookManagement from '../BookManagement/BookManagement'; 
import UserManagement from '../UserManagement/UserManagement'; 
import OrderManagement from '../OrderManagement/OrderManagement'; 

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    <Shell>
      {isAuthenticated ? (
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
            <Routes>
              <Route path="/books" element={<BookManagement />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/orders" element={<OrderManagement />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </Shell>
  );
};

export default HomePage;
