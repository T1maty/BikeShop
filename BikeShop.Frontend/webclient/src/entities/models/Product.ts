export interface IProduct {
    name: string,
    catalogKey: string,
    category: string,
    barcode: string,
    manufacturerBarcode: string,
    incomePrice: number,
    dealerPrice: number,
    retailPrice: number,
    brandId: number,
    checkStatus: string,
    retailVisibility: boolean,
    b2BVisibility: boolean,
    id: number,
    createdAt: string,
    updatedAt: string,
    enabled: boolean
}