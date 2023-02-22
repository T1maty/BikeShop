export interface UpdateService {
    shopId: number
    id: number
    name: string
    clientDescription: string
    userMasterDescription: string
    userCreatedDescription: string
    userMasterId: string
}

export interface UpdateServiceStatus {
    serviceId: number
    newStatus: number
}