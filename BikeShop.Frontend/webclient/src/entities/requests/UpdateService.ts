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

export interface UpdateServiceNew {
   id: number
   name: string
   clientDescription: string
   userMasterDescription: string
   userCreatedDescription: string
   userMasterId: string
   workDiscountId: number
   productDiscountId: number
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