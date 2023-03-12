export interface CreateShop {
    name: string
    address: string
    phone: string
    secret: string
    storageId: number
}

export interface UpdateShop extends CreateShop {
    id: number
    enabled: boolean
    cashboxCash: number
    cashboxTerminal: number
}