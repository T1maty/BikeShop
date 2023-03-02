export interface CreateService {
    shopId: number

    clientId: string
    name: string
    clientDescription: string

    userMasterId: string
    userCreatedId: string

    productDiscountId: number
    workDiscountId: number

    serviceProducts: ServiceProduct[]
    serviceWorks: ServiceWork[]
}

export type ServiceProductWork = {
    name: string
    quantity: number
    quantityUnitId: number
    price: number
    discount: number
    total: number
    userId: string
}

export type ServiceProduct = ServiceProductWork & {
    catalogKey: string
    serialNumber: string
}

export type ServiceWork = ServiceProductWork & {
    description: string
}
