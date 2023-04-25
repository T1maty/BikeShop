export interface UpdateProductPrices {
    productId: number
    user: string // userId
    incomePrice: number
    retailPrice: number
    dealerPrice: number
}