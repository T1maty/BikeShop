import {ProductExtended} from "../../../../../entities";

export interface SupplyInvoiceCreateModel {
    supplyInvoice: {
        shopId: number
        user: string
        description: string
    }
    supplyInvoiceProducts: ProductExtended[]
}