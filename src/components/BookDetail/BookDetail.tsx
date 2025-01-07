import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getBookById, updateBook, deleteBook } from '../../services/bookService'; 
import { Book } from '../../types/Book';
import { UpdateBookPayload } from '../../types/Book'; 
import './BookDetail.css';

const BookDetail: React.FC = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [book, setBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<UpdateBookPayload>({
    title: '',
    author: '',
    price: 0,
    stock: 0,
    image: new File([], ''),
    description: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookDetails = await getBookById(id || '');
        setBook(bookDetails);
        setFormData({
          title: bookDetails.title,
          author: bookDetails.author,
          price: bookDetails.price,
          stock: bookDetails.stock,
          image: new File([], ''), 
          description: bookDetails.description || '',
        });
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết sách', error);
      }
    };

    if (id) fetchBookDetails();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedBook = await updateBook(id || '', formData);
      console.log('Sách đã được cập nhật:', updatedBook);
      navigate('/books'); 
    } catch (error) {
      console.error('Lỗi khi cập nhật sách:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa truyện này không?');
    if (!confirmDelete) return;

    try {
      await deleteBook(id || '');
      console.log('Sách đã bị xóa');
      navigate('/books'); // Điều hướng về trang danh sách sách sau khi xóa
    } catch (error) {
      console.error('Lỗi khi xóa sách:', error);
    }
  };

  if (!book) return <div>Đang tải...</div>;

  return (
    <div className="book-detail-container">
      <h2>Chi tiết truyện</h2>
      <form onSubmit={handleUpdate} className="book-detail-form">
        <div>
          <label>Tiêu đề</label>
          <input
            type="text"
            value={formData.title}
            readOnly
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label>Tác giả</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Số lượng tồn kho</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label>Ảnh</label>
          <input
            type="file"
            onChange={(e) => e.target.files && setFormData({ ...formData, image: e.target.files[0] })}
          />
        </div>
        <div>
          <label>Mô tả</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Cập nhật truyện</button>
          <button type="button" onClick={handleDelete} className="btn btn-danger">Xóa truyện</button>
        </div>
      </form>
    </div>
  );
};

export default BookDetail;
