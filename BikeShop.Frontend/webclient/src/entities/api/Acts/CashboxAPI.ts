import {$api} from "../../../shared"
import {CashboxAction} from '../../entities/Acts/Cashbox/CashboxAction'
import {AxiosResponse} from 'axios'
import {CashboxActionRequest} from '../../requests/CashboxActionRequest'

export const CashboxAPI = {
    getByShop(shopId: number, take: number): Promise<AxiosResponse<CashboxAction[]>> {
        return (
            $api.get<CashboxAction[]>(`/cashboxaction/getbyshop?id=${shopId}&take=${take}`)
        )
    },
    createCashbox(data: CashboxActionRequest): Promise<AxiosResponse<any>> {
        return (
            $api.post<CashboxActionRequest>('/cashboxaction/create', data)
        )
    },
}