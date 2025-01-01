import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import SignInPage from './pages/SignIn/SignIn';
import BookManagement from './pages/BookManagement/BookManagement';
import UserManagement from './pages/UserManagement/UserManagement';
import OrderManagement from './pages/OrderManagement/OrderManagement';
import Dashboard from './pages/Dashboard/Dashboard'
import BookDetail from './components/BookDetail/BookDetail';
import BookList from './components/BookList/BookList';
import CreateBook from './components/CreateBook/CreateBook';
import UserList from './components/UserList/UserList';
import UserDetail from './components/UserDetail/UserDetail';
import UserHistory from './components/UserHistory/UserHistory';
import OrderList from './components/OrderList.tsx/OrderList';
import OrderDetail from './components/OrderDetail/OrderDetail';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path="/books" element={<BookManagement />} >
        <Route index element={<BookList />} />
        <Route path="books/create" element={<CreateBook />} />
        <Route path=":id" element={<BookDetail />} />
      </Route>
      <Route path="/users" element={<UserManagement />} >
        <Route index element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/users/:id/history" element={<UserHistory />} />
      </Route>
      <Route path="/orders" element={<OrderManagement />}>
        <Route index element={<OrderList />} />
        <Route path=":id" element={<OrderDetail />} />
      </Route>

    </Routes>
  );
};

export default App;
