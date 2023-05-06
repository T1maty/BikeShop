import {ProductExtended} from "../../../../../entities";

export interface SupplyInvoiceUpdateModel {
    supplyInvoice: {
        id: number
        user: string
        description: string
    }
    supplyInvoiceProducts: ProductExtended[]

}