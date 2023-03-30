export interface BillProductDTO {
    productId: number
    name: string
    catalogKey: string
    serialNumber: string
    description: string
    quantity: number
    quantityUnitName: string
    currencySymbol: string
    price: number
    discount: number
}