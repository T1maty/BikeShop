import {Product} from "../../entities/Product"
import {QuantityUnit} from "../Others/QuantityUnit"

export interface ProductExtended {
    product: Product

    quantityUnit: QuantityUnit
    quantity: number
}