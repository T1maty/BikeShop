export interface ServiceWork {
    id: number,
    createdAt: string,
    updatedAt: string,
    enabled: true,
    workId: number,
    name: string,
    description: string,
    quantity: number,
    price: number,
    discount: number,
    total: number,
    userId: string,
    serviceId: number
}