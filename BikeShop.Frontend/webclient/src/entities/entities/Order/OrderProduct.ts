export interface OrderProduct {
    id: number;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
    orderId: number;
    productId: number;
    description: string;
    catalogKey: string;
    serialNumber: string;
    name: string;
    quantity: number;
    quantityUnitId: number;
    quantityUnitName: string;
    price: number;
    discount: number;
    total: number;
}