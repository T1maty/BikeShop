export interface CashboxAction {
    id: number
    shopId: number
    cash: number
    description: string

    createdAt: string
    updatedAt: string
    enabled: boolean
    userCreated: string
    userUpdated: string
}