export interface Product {
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean
    name: string
    catalogKey: string
    categoryImport: string
    categoryId: number
    categoryWay: string
    categoryName: string
    barcode: string
    manufacturerBarcode: string
    quantityUnitId: number
    quantityUnitName: string
    incomePrice: number
    dealerPrice: number
    retailPrice: number
    brandId: number
    checkStatus: string
    retailVisibility: boolean
    b2BVisibility: boolean
}