import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Book } from '../../types/Book';
import './BookList.css'; 

const BookList: React.FC = () => {
  const { books } = useOutletContext<{ books: Book[] }>(); 

  if (!books || books.length === 0) {
    return <div className="no-books">Không có sách nào để hiển thị.</div>;
  }

  return (
    <div className="book-list">
      <div className="book-list-header">
        <h3>Danh sách truyện</h3>
        <div className="add-book-btn-container">
          <Link to="/books/create">
            <button>Thêm truyện</button>
          </Link>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Số lượng tồn kho</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>
                <img src={book.imageUrl || ''} alt={book.title} />
              </td>
              <td>{book._id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.stock}</td>
              <td>
                <Link to={`/books/${book._id}`}>Chi tiết</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
