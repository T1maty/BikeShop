export interface Encashment {
    id: number
    shopId: number
    cash: number
    description: string
    card: number
    status: string
    time: string

    createdAt: string
    updatedAt: string
    enabled: boolean
    userCreated: string
    userUpdated: string
}