import {Product} from "entities";

export interface TableRow {
    id: number,
    name: string,
    catalogKey: string,
    quantity: number,
    quantitySticker: number,
    product: Product
}