export interface CreateProduct {
    name: string
    catalogKey: string
    category: string
    manufacturerBarcode: string
    incomePrice: number
    dealerPrice: number
    retailPrice: number
    retailVisibility: boolean
    b2BVisibility: boolean
    categoryId: number | null
    quantityUnitId: number,
    user: string,
}