import {SupplyInvoice} from "../../../entities/Acts/SupplyInvoice/SypplyInvoice";
import {SupplyInvoiceProduct} from "../../../entities/Acts/SupplyInvoice/SupplyInvoiceProduct";

export interface SupplyInvoiceDTO {
    supplyInvoice: SupplyInvoice
    supplyInvoiceProducts: SupplyInvoiceProduct[]
}