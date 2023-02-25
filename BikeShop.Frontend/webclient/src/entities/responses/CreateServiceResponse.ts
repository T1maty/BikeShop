import {ServiceStatusType} from "../models/ServiceItem";
import {IUser} from "../models/IUser";

export interface CreateServiceResponse {
    shopId: number

    id: number // номер заказа
    createdAt: string
    updatedAt: string
    enabled: boolean

    name: string // название техники (по макету)
    clientDescription: string // описание заказа
    status: ServiceStatusType // статус заказа
    client: IUser // данные клиента

    userCreated: IUser // тот, кто создал заказ
    userCreatedDescription: string // комментарий к описанию удаления
    userDeleted: string // тот, кто удалил заказ из архива

    userMaster: IUser // данные мастера
    userMasterDescription: string // комментарий от мастера

    priceWork: number // стоимость услуги
    discountWork: number
    totalWork: number

    priceProduct: number // стоимость продукта
    discountProduct: number
    totalProduct: number

    price: number // общая стоимость сервиса
    discount: number
    total: number

    products: ProductWorkItem[]
    works: ProductWorkItem[]
}

type ProductWorkItem = {
    id: number
    createdAt: string
    updatedAt: string
    enabled: true
    name: string
    description: string
    quantity: number
    quantityUnitId: number
    price: number
    discount: number
    total: number
    userId: string
    serviceId: number
}