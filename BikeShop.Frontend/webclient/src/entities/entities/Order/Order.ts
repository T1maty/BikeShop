export interface Order {
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean
    shopId: number;
    orderType: string;
    deliveryType: string;
    deliveryInfo: string;
    orderStatus: string;
    isPayed: boolean;
    description: string;
    descriptionUser: string;
    discountId: number;
    totalDiscount: number;
    totalPrice: number;
    clientId: string;
    clientPhone: string;
    clientFIO: string;
    clientEmail: string;
    userId: string;
    userFIO: string;
}