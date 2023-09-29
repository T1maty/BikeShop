export interface Order {
    id: number;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
    shopId: number;
    orderType: string;
    orderStatus: string;
    deliveryType: string;
    deliveryInfo: string;
    isPayed: boolean;
    paymentId: number;
    isPrePay: number;
    descriptionCilent: string;
    discountId: number;
    orderDiscount: number;
    totalProductDiscount: number;
    totalProductsPrice: number;
    totalPrice: number;
    clientId: string;
    userCreated: string;
    userUpdated: string;
    managerId: string;
}