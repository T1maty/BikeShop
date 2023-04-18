import {$api} from "../../../shared";
import {SupplyInvoiceDTO} from "../../models/Acts/SupplyInvoice/SupplyInvoiceDTO";

export const SupplyInvoiceAPI = {
    getByShop(shopId: number, take: number): any {
        return (
            $api.get<SupplyInvoiceDTO>(`/supplyinvoice/getbyshop?id=${shopId}&take=${take}`)
        )
    },
}