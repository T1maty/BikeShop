import {Bill} from "../DataTransferObjects/Bill"
import {BillProduct} from "../DataTransferObjects/BillProduct"

export interface BillWithProducts {
    bill: Bill
    products: BillProduct[]
}