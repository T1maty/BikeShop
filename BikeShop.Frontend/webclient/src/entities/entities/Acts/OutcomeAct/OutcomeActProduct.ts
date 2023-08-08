export interface OutcomeActProduct {
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean
    outcomeActId: number;
    productId: number;
    name: string;
    description: string;
    catalogKey: string;
    barcode: string;
    manufBarcode: string;
    quantityUnitName: string;
    incomePrice: number;
    dealerPrice: number;
    retailPrice: number;
    brandName: string;
    quantity: number;
}