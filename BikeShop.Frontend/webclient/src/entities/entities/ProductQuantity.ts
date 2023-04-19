import {Product} from "entities";

export type ProductQuantity = Product & {
    quantity: number
    quantityUnitName: string
    quantityId: number
}