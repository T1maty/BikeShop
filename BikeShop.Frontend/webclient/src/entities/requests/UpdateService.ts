import {ServiceStatusType} from "../models/ServiceItem";
import {ServiceProduct, ServiceWork} from "./CreateService";

export interface UpdateService {
    id: number
    name: string
    clientDescription: string

    userMasterId: string
    userMasterDescription: string
    userCreatedDescription: string

    productDiscountId: number
    workDiscountId: number

    serviceProducts: ServiceProduct[]
    serviceWorks: ServiceWork[]
}

export interface UpdateServiceStatus {
    id: number
    status: ServiceStatusType
}