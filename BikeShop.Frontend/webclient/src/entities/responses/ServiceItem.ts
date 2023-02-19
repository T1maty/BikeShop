export interface ServiceItem {
    shopId: number

    id: number // номер заказа
    createdAt: string
    updatedAt: string
    enabled: boolean

    name: string // название техники (по макету)
    status: number // статус заказа
    clientId: string
    clientDescription: string // ???
    userCreatedId: string
    userCreatedDescription: string // описание заказа
    userMasterId: string
    userMasterDescription: string // имя мастера
    userDeleted: string

    priceWork: number
    discountWork: number
    totalWork: number

    priceService: number
    discountService: number
    totalService: number

    price: number
    discount: number
    total: number

}