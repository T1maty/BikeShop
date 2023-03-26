export interface CreateProduct {
    name: string
    catalogKey: string
    category: string
    manufacturerBarcode: string
    incomePrice: number
    dealerPrice: number
    retailPrice: number
    brandId: number
    checkStatus: string
    retailVisibility: boolean
    b2BVisibility: boolean
    tagsIds: string[]
}