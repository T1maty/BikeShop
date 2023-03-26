import {User} from "../Auth/User";

export type ServiceStatusType =
    'Waiting' |
    'InProcess' |
    'WaitingSupply' |
    'Ready' |
    'Ended' |
    'Canceled' |
    'Deleted';

export interface ServiceItem {
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean

    name: string
    status: ServiceStatusType
    client: User
    clientDescription: string
    userMaster: User
    userMasterDescription: string

    userCreated: User
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

    products: ServiceItemProduct[]
    works: ServiceItemWork[]
}

export type ServiceItemProductWork = {
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean
    name: string
    quantity: number

    price: number
    discount: number
    total: number
    userId: string
    serviceId: number
}

export type ServiceItemProduct = ServiceItemProductWork & {
    productId: number
    catalogKey: string
    serialNumber: string
    quantityUnitId: number
    quantityUnitName: string
}

export type ServiceItemWork = ServiceItemProductWork & {
    workId: number
    description: string

}