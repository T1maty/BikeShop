import {ServiceItemProduct, ServiceItemWork} from "../models/ServiceItem";

export interface CreateService {
    id: number

    shopId: number

    clientId: string
    name: string
    clientDescription: string

    userMasterId: string
    userCreatedId: string

    userMasterDescription: string
    userCreatedDescription: string

    productDiscountId: number
    workDiscountId: number

    serviceProducts: ServiceItemProduct[]
    serviceWorks: ServiceItemWork[]
}

