// import {ProductWorkItem} from './CreateServiceResponse';
import {ServiceProduct, ServiceWork} from "../requests/CreateService";

export interface UpdateServiceResponse {
    id: number // номер заказа
    name: string // название техники
    clientDescription: string // описание заказа
    userMasterId: string
    userMasterDescription: string // комментарий от мастера
    userCreatedDescription: string // комментарий к описанию удаления
    workDiscountId: number
    productDiscountId: number
    products: ServiceProduct[]
    works: ServiceWork[]
}