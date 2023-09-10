export interface UpdateProduct {
    id: number
    name: string
    catalogKey: string
    category: string
    manufacturerBarcode: string
    retailVisibility: boolean
    b2BVisibility: boolean
    user: string
}