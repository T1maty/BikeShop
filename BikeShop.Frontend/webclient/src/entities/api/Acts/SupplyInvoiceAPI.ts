import {$api} from "../../../shared"
import {SupplyInvoiceDTO} from "../../models/Acts/SupplyInvoice/SupplyInvoiceDTO"
import {AxiosResponse} from "axios";

export const SupplyInvoiceAPI = {
    getByShop(shopId: number, take: number): Promise<AxiosResponse<SupplyInvoiceDTO[]>> {
        return (
            $api.get<SupplyInvoiceDTO[]>(`/supplyinvoice/getbyshop?id=${shopId}&take=${take}`)
        )
    },
    create(data: SupplyInvoiceDTO): Promise<AxiosResponse<SupplyInvoiceDTO>> {
        return (
            $api.post<SupplyInvoiceDTO>(`/supplyinvoice/create`, data)
        )
    },
    update(data: SupplyInvoiceDTO): Promise<AxiosResponse<SupplyInvoiceDTO>> {
        return (
            $api.put<SupplyInvoiceDTO>(`/supplyinvoice/update`, data)
        )
    },
    execute(invoiceId: number, userId: string): Promise<AxiosResponse> {

        return $api.post<SupplyInvoiceDTO>(`/supplyinvoice/execute?invoiceId=${invoiceId}&userId=${userId}`)

    },
}