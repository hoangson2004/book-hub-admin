import React, { useState } from 'react';
import { createBook } from '../../services/bookService'; // API service
import { BookBase } from '../../types/Book'; // Import type BookBase
import { useNavigate } from 'react-router-dom'; // Import useNavigate để chuyển hướng
import './CreateBook.css'; // Import CSS file

const CreateBook: React.FC = () => {
  const [formData, setFormData] = useState<BookBase>({
    title: '',
    author: '',
    price: 0,
    stock: 0,
    image: new File([], ''),
    description: '',
  });
  const navigate = useNavigate(); 

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBook = await createBook(formData);
      console.log('Sách đã được tạo:', newBook);
      
      alert('Sách đã được tạo thành công!');
      navigate('/books'); 
    } catch (error) {
      console.error('Lỗi khi tạo sách:', error);
      alert('Đã có lỗi xảy ra khi tạo sách!');
    }
  };

  return (
    <div className="create-book-container">
      <h2>Thêm truyện</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>Tiêu đề</label>
          <input
            type="text"
            value={formData.title}
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
            value={formData.price === 0 ? '' : formData.price} 
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            step="any"  
            min="0"  
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
        <button type="submit">Tạo truyện mới</button>
      </form>
    </div>
  );
};

export default CreateBook;
