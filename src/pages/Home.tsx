import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Shell from '../components/Shell/Shell';
import { useAuth } from '../provider/AuthContext';
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard'; 
import BookManagement from './BookManagement/BookManagement'; 
import UserManagement from './UserManagement/UserManagement';
import OrderManagement from './OrderManagement/OrderManagement'; 

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Shell>
      {isAuthenticated ? (
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
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
