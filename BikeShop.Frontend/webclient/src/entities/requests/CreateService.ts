export interface CreateService {
    shopId: number

    clientId: string
    name: string
    clientDescription: string

    userCreatedId: string
    userMasterId: string

    productDiscountId: number
    workDiscountId: number

    serviceProducts: ServiceProduct[]
    serviceWorks: ServiceWork[]
}

type ServiceProductWork = {
    name: string
    quantity: number
    quantityUnitId: number
    price: number
    discount: number
    total: number
    userId: string
}

type ServiceProduct = ServiceProductWork & {
    catalogKey: string
    serialNumber: string
}

type ServiceWork = ServiceProductWork & {
    description: string
}
