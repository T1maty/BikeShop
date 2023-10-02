import {CreateProductDTO} from "./CreateProductDTO";

export interface CreateOrder {
    products: CreateProductDTO[];
    shopId: number;
    deliveryType: string;
    deliveryInfo: string;
    descriptionCilent: string;
    discountId: number;
    isPrePay: boolean;
    clientId: string;
    userId: string;
    managerId: string;
}