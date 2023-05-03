import {BillProductDTO} from "./BillProductDTO"

export interface NewBillDTO {
    cash: number
    bankCount: number
    card: number
    personalBalance: number
    userId: string
    clientId: string
    shopId: string
    currencyId: number
    description: string
    products: BillProductDTO[]
}