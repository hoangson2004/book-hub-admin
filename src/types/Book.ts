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
    title: string; 
    author: string; 
    price: number; 
    stock: number; 
    image: File; 
    description?: string; 
}

export type CreateBookPayload = BookBase;

export type UpdateBookPayload = Partial<BookBase>;
