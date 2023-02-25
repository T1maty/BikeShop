import {ProductWorkItem} from './CreateServiceResponse';

export interface UpdateServiceResponse {
    id: number // номер заказа
    name: string // название техники (по макету)
    clientDescription: string // описание заказа
    userMasterId: string
    userMasterDescription: string // комментарий от мастера
    userCreatedDescription: string // комментарий к описанию удаления
    workDiscountId: number
    productDiscountId: number
    products: ProductWorkItem[]
    works: ProductWorkItem[]
}