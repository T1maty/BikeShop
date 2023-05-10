export interface Encashment {
    id: number
    shopId: number
    cash: number
    description: string
    card: number
    status: string
    time: string
    cashRemain: number,

    createdAt: string
    updatedAt: string
    enabled: boolean
    userCreated: string
    userUpdated: string
}