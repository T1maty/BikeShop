import {ServiceStatusType} from "../../pages/workspace/Service/Service";

export interface ServiceItem {
    shopId: number

    id: number // номер заказа
    createdAt: string
    updatedAt: string
    enabled: boolean

    name: string // название техники (по макету)
    status: ServiceStatusType // статус заказа
    clientId: string
    clientDescription: string // описание заказа

    userCreatedId: string // ИД того, кто создал заказ
    userCreatedDescription: string // имя того, кто создал заказ
    userDeleted: string // тот, кто удалил заказ из архива

    userMasterId: string // ?
    userMasterDescription: string // имя мастера

    priceWork: number // стоимость услуги
    discountWork: number
    totalWork: number

    priceProduct: number // стоимость продукта
    discountProduct: number
    totalProduct: number

    price: number // общая стоимость сервиса
    discount: number
    total: number
}