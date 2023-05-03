export interface BillProductDTO {
    productId: number
    name: string
    catalogKey: string
    serialNumber: string
    description: string
    quantity: number
    quantityUnitName: string
    currencySymbol: string
    currencyId: number
    price: number
    discount: number
    total: number
}