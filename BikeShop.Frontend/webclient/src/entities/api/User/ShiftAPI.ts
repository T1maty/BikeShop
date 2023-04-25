import {$api} from "../../../shared"
import {SupplyInvoiceDTO} from "../../models/Acts/SupplyInvoice/SupplyInvoiceDTO"

export const ShiftAPI = {
    open(userId: string): any {
        return (
            $api.post<SupplyInvoiceDTO>(`/shift/openshift?UserId=${userId}`)
        )
    },
    close(userId: string): any {
        return (
            $api.post<SupplyInvoiceDTO>(`/shift/closeshift?UserId=${userId}`)
        )
    },
    pause(userId: string): any {
        return (
            $api.post<SupplyInvoiceDTO>(`/shift/pauseshift?UserId=${userId}`)
        )
    },
    resume(userId: string): any {
        return (
            $api.post<SupplyInvoiceDTO>(`/shift/resumeshift?UserId=${userId}`)
        )
    },
    getHours(): any {
        return (
            $api.get<SupplyInvoiceDTO>(`/shift/shift`)
        )
    },
    getUserStatus(userId: string): any {
        return (
            $api.get<SupplyInvoiceDTO>(`/shift/getuserstatus?UserId=${userId}`)
        )
    },
}