import {Product} from "../../DataTransferObjects/Product"
import {QuantityUnit} from "../Others/QuantityUnit"

export interface ProductExtended {
    product: Product

    quantityUnit: QuantityUnit | null
    quantity: number
}