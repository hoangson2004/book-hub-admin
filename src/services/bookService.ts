import api from './api';

import { Book, CreateBookPayload, UpdateBookPayload } from '../types/Book';

export const getAllBooks = async (): Promise<Book[]> => {
    try {
        const response = await api.get('/book');
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data.map((book: Book) => ({
                _id: book._id,
                title: book.title,
                author: book.author,
                price: book.price,
                stock: book.stock,
                imageUrl: book.imageUrl,
                createdAt: book.createdAt
            }));
        } else {
            throw new Error('Dữ liệu không hợp lệ, trường "data" không phải là mảng');
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sách:', error);
        throw error;
    }
};

export const getBookById = async (id: string): Promise<Book> => {
    try {
        const response = await api.get(`/book/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết sách:', error);
        throw error;
    }
};


export const createBook = async (data: CreateBookPayload): Promise<Book> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('price', data.price.toString());
    formData.append('stock', data.stock.toString());
    if (data.description) formData.append('description', data.description);
    formData.append('image', data.image);

    const response = await api.post('/book', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.data;
};

export const updateBook = async (id: string, data: UpdateBookPayload): Promise<Book> => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.author) formData.append('author', data.author);
    if (data.price) formData.append('price', data.price.toString());
    if (data.stock) formData.append('stock', data.stock.toString());
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    const response = await api.put(`/book/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.data;
};

export const deleteBook = async (bookId: string) => {
    try {
        const response = await api.delete(`/book/${bookId}`);
        return response.status;
    } catch (error) {
        console.error('Lỗi khi xóa sách:', error);
        throw error;
    }
}