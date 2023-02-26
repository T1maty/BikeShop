import {ServiceStatusType} from "../models/ServiceItem";

export interface UpdateServiceStatus {
    id: number
    status: ServiceStatusType
}

export interface UpdateService {
    id: number
    name: string
    clientDescription: string

    userMasterId: string
    userMasterDescription: string
    userCreatedDescription: string

    productDiscountId: number
    workDiscountId: number

    serviceProducts: [
        {
            catalogKey: string
            serialNumber: string
            name: string
            quantity: number
            quantityUnitId: number
            price: number
            discount: number
            total: number
            userId: string
        }
    ],
    serviceWorks: [
        {
            name: string
            description: string
            quantity: number
            quantityUnitId: number
            price: number
            discount: number
            total: number
            userId: string
        }
    ]
}