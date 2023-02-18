export interface CreateShop {
    name: string
    address: string
    phone: string
    secret: string
    storageId: number
    cashboxCash: number
    cashboxTerminal: number
}

export interface UpdateShop extends CreateShop {
    id: number
}