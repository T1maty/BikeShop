import {SupplyInvoice} from "../../../entities/Acts/SupplyInvoice/SupplyInvoice"
import {SupplyInvoiceProduct} from "../../../entities/Acts/SupplyInvoice/SupplyInvoiceProduct"

export interface SupplyInvoiceDTO {
    supplyInvoice: SupplyInvoice
    supplyInvoiceProducts: SupplyInvoiceProduct[]
}