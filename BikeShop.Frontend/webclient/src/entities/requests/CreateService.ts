import {ServiceItemProduct, ServiceItemWork} from "../models/ServiceItem";
import {IUser} from "../models/IUser";

export interface CreateService {
    id: number

    shopId: number

    client: IUser
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

