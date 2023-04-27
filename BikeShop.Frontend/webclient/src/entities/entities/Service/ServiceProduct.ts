export interface ServiceProduct {
    id: number,
    createdAt: string,
    updatedAt: string,
    enabled: boolean,
    productId: number,
    catalogKey: string,
    serialNumber: string,
    name: string,
    quantity: number,
    quantityUnitId: number,
    quantityUnitName: string,
    price: number,
    discount: number,
    total: number,
    userId: string,
    serviceId: number
}