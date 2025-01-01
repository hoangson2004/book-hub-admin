import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getAllBooks } from '../../services/bookService';
import { Book } from '../../types/Book';
import Sidebar from '../../components/Sidebar/Sidebar';  
import './BookManagement.css'; 
import Shell from '../../components/Shell/Shell';

const BookManagement: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAllBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sách', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Shell>
      <div className="book-management-container">
        <Sidebar />
        <div className="book-management-content">
          <Outlet context={{ books }} />
        </div>
      </div>
    </Shell>
  );
};

export default BookManagement;
