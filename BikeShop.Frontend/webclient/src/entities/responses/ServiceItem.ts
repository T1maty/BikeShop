export interface ServiceItem {
    shopId: number

    id: number // номер заказа
    createdAt: string
    updatedAt: string
    enabled: boolean

    name: string // название техники (по макету)
    status: number // статус заказа
    clientId: string
    clientDescription: string // описание заказа
    userCreatedId: string
    userCreatedDescription: string // тот, кто создал заказ
    userMasterId: string
    userMasterDescription: string // имя мастера
    userDeleted: string // тот, кто удалил заказ из архива

    priceWork: number // стоимость услуги
    discountWork: number
    totalWork: number

    priceService: number // ?! стоимость продукта
    discountService: number
    totalService: number

    price: number // общая стоимость сервиса
    discount: number
    total: number

}