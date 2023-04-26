import {User} from "../models/Auth/User"
import {ServiceItemProduct, ServiceItemWork} from "../models/Service/ServiceItem"

export interface CreateService {
    id: number

    shopId: number

    client: User
    name: string
    clientDescription: string

    userMasterId: string
    userId: string

    userMasterDescription: string
    userCreatedDescription: string

    productDiscountId: number
    workDiscountId: number

    serviceProducts: ServiceItemProduct[]
    serviceWorks: ServiceItemWork[]
}

