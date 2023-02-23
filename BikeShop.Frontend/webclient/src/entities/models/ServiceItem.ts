export interface ServiceItem {
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean

    name: string
    status: string
    client: null | string
    clientDescription: string
    userMaster: string // null | string
    userMasterDescription: string

    userCreated: null | string
    userCreatedDescription: string
    userDeleted: null | string

    workDiscount: null | number
    productDiscount: null | number
    priceWork: number
    discountWork: number
    totalWork: number
    priceProduct: number
    discountProduct: number
    totalProduct: number
    price: number
    discount: number
    total: number

    products: [
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
            serviceId: number
            id: number
            createdAt: string
            updatedAt: string
            enabled: boolean
        }
    ],
    works: [
        {
            name: string
            description: string
            quantity: number
            quantityUnitId: number
            price: number
            discount: number
            total: number
            userId: string
            serviceId: number
            id: number
            createdAt: string
            updatedAt: string
            enabled: boolean
        }
    ]
}