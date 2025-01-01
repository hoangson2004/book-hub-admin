import api from './api';
import {
    GetOrdersByUserIdResponse,
    GetAllOrdersResponse,
    GetOrderByIdResponse
} from '../types/Order';

export const getOrdersByUserId = async (userId: string): Promise<GetOrdersByUserIdResponse> => {
    try {
        const response = await api.get(`/order/user/${userId}`);
        return response.data; 
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng theo userId:', error);
        throw error;
    }
};

export const getAllOrders = async (): Promise<GetAllOrdersResponse> => {
    try {
        const response = await api.get('/order/getall');
        return response.data; 
    } catch (error) {
        console.error('Lỗi khi lấy tất cả đơn hàng:', error);
        throw error;
    }
};

export const getOrderById = async (orderId: string): Promise<GetOrderByIdResponse> => {
    try {
        const response = await api.get(`/order/${orderId}`);
        return response.data; 
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng theo orderId:', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
    try {
        const response = await api.put(`/order/update`, {
            orderId,
            status,
        });
        console.log('Cập nhật trạng thái đơn hàng thành công:', response.data);
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
        throw error;
    }
};