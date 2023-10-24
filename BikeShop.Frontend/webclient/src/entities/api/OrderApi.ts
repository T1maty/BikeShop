import {$api} from "../../shared";
import {OrderWithProducts} from "../entities/Order/OrderWithProducts";
import {AxiosResponse} from "axios/index";
import {CreateOrder} from "../models/Order/CreateOrder";

export const OrderApi = {
    //returns all 0 and shopId orders wich not closed
    //if 0, return all orders wich not closed
    GetByShop(shopId: string): Promise<AxiosResponse<OrderWithProducts[]>> {
        return (
            $api.get<OrderWithProducts[]>(`/order/getbyshop?ShopId=${shopId}`)
        )
    },

    Create(dto: CreateOrder): Promise<AxiosResponse<OrderWithProducts>> {
        return (
            $api.post<OrderWithProducts>(`/order/internalcreate`, dto)
        )
    },

    Confirm(userId: string, orderId: number): Promise<AxiosResponse<OrderWithProducts>> {
        return (
            $api.post<OrderWithProducts>(`/order/confirm?UserId=${userId}&OrderId=${orderId}`)
        )
    },
    Collected(userId: string, orderId: number): Promise<AxiosResponse<OrderWithProducts>> {
        return (
            $api.post<OrderWithProducts>(`/order/collected?UserId=${userId}&OrderId=${orderId}`)
        )
    },
    Shipped(userId: string, orderId: number): Promise<AxiosResponse<OrderWithProducts>> {
        return (
            $api.post<OrderWithProducts>(`/order/shipped?UserId=${userId}&OrderId=${orderId}`)
        )
    },
    Delivered(userId: string, orderId: number): Promise<AxiosResponse<OrderWithProducts>> {
        return (
            $api.post<OrderWithProducts>(`/order/delivered?UserId=${userId}&OrderId=${orderId}`)
        )
    },
}