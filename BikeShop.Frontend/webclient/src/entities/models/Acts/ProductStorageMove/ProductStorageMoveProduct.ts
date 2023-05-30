export interface ProductStorageMoveProduct {
    id: number;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
    productMoveId: number;
    productId: number;
    name: string;
    description: string;
    catalogKey: string;
    barcode: string;
    manufacturerBarcode: string;
    quantityUnitName: string;
    quantity: number;
}