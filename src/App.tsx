import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import SignInPage from './pages/SignIn/SignIn';
import BookManagement from './pages/BookManagement/BookManagement';
import UserManagement from './pages/UserManagement/Usermanagement';
import OrderManagement from './pages/OrderManagement/OrderManagement';
import Dashboard from './pages/Dashboard/Dashboard'
import BookDetail from './components/BookDetail/BookDetail';
import BookList from './components/BookList/BookList';
import CreateBook from './components/CreateBook/CreateBook';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path="/books" element={<BookManagement />} >
        <Route index element={<BookList />} />
        <Route path="create" element={<CreateBook />} />
        <Route path=":id" element={<BookDetail />} />
      </Route>
      <Route path="/users" element={<UserManagement />} />
      <Route path="/orders" element={<OrderManagement />} />
    </Routes>
  );
};

export default App;
