import {Product} from "entities/index";

export type ProductQuantity = Product & {
    quantity: number
    quantityUnitName: string
    quantityId: number
}