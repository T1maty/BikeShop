import {ServiceStatusType} from "../models/Service/ServiceItem";
import {User} from "../models/Auth/User";


export interface CreateServiceResponse {
    shopId: number

    id: number // номер заказа
    createdAt: string
    updatedAt: string
    enabled: boolean

    name: string // название техники
    status: ServiceStatusType // статус заказа
    client: User // данные клиента
    clientDescription: string // описание заказа

    userMaster: User // данные мастера
    userMasterDescription: string // комментарий от мастера

    userCreated: User // тот, кто создал заказ
    userCreatedDescription: string // комментарий к описанию удаления
    userDeleted: User // тот, кто удалил заказ из архива

    priceWork: number // стоимость услуги
    discountWork: number
    totalWork: number

    priceProduct: number // стоимость продукта
    discountProduct: number
    totalProduct: number

    price: number // общая стоимость сервиса
    discount: number
    total: number

    //products: ServiceProduct[]
    //works: ServiceWork[]
}

// export interface ProductWorkItem {
//     id: number
//     createdAt: string
//     updatedAt: string
//     enabled: true
//     name: string
//     description: string
//     quantity: number
//     quantityUnitId: number
//     price: number
//     discount: number
//     total: number
//     userId: string
//     serviceId: number
// }

// type ServiceResponseAxiosType = {
//     config: any
//     data: CreateServiceResponse[]
//     headers: any
//     request: any
//     status: number
//     statusText: string
// }