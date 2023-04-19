import {$api} from "../../../shared";
import {SupplyInvoiceDTO} from "../../models/Acts/SupplyInvoice/SupplyInvoiceDTO";

export const SupplyInvoiceAPI = {
    getByShop(shopId: number, take: number): any {
        return (
            $api.get<SupplyInvoiceDTO>(`/supplyinvoice/getbyshop?id=${shopId}&take=${take}`)
        )
    },
    create(data: SupplyInvoiceDTO): any {
        return (
            $api.post<SupplyInvoiceDTO>(`/supplyinvoice/create`, data)
        )
    },
    update(data: SupplyInvoiceDTO): any {
        return (
            $api.put<SupplyInvoiceDTO>(`/supplyinvoice/update`, data)
        )
    },
    execute(invoiceId: number, userId: string): any {
        return (
            $api.post<SupplyInvoiceDTO>(`/supplyinvoice/execute?invoiceId=${invoiceId}&userId=${userId}`)
        )
    },
}