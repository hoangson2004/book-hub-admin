export interface Book {
    _id: string;
    title: string;
    author: string;
    price: number;
    stock: number;
    imageUrl?: string;
    description?: string;
    createdAt?: Date;
}


export interface BookBase {
    title: string; // Tiêu đề
    author: string; // Tác giả
    price: number; // Giá tiền
    stock: number; // Số lượng tồn kho
    image: File; // Ảnh bìa (dạng File upload)
    description?: string; // Mô tả
}

export type CreateBookPayload = BookBase;

export type UpdateBookPayload = Partial<BookBase>;
