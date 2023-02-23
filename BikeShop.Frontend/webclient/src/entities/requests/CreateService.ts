// export interface CreateService {
//     shopId: number
//     clientId: string
//     name: string
//     clientDescription: string
//     userMasterId: string
// }

export interface CreateService {
    shopId: number

    clientId: string
    name: string
    clientDescription: string

    userCreatedId: string
    userMasterId: string

    productDiscountId: number
    workDiscountId: number

    serviceProducts: [
        {
            catalogKey: string
            serialNumber: string
            name: string
            quantity: number
            quantityUnitId: number
            price: number
            discount: number
            total: number
            userId: string
        }
    ],
    serviceWorks: [
        {
            name: string
            description: string
            quantity: number
            quantityUnitId: number
            price: number
            discount: number
            total: number
            userId: string
        }
    ]
}
