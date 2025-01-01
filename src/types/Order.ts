export interface OrderItem {
    bookId: {
        _id: string;
        title: string;
        author: string;
    };
    quantity: number;
    price: number;
}

export interface Order {
    _id: string;
    userId: {
        _id: string;
        email: string;
    };
    items: OrderItem[];
    totalAmount: number;
    depositAmount: number;
    rentalAmount: number;
    paymentMethod: string;
    status: string;
    dueDate: string; 
    createdAt: string;
    updatedAt: string;
}

export type GetOrdersByUserIdResponse = Order[];

export type GetOrderByIdResponse = Order;

export type GetAllOrdersResponse = Order[];