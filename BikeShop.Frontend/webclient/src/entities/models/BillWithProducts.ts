import {Bill} from "../entities/Bill"
import {BillProduct} from "../entities/BillProduct"

export interface BillWithProducts {
    bill: Bill
    products: BillProduct[]
}