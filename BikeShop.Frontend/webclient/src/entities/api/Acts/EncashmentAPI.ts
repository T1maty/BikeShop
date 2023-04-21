import {$api} from "../../../shared"
import {Encashment} from '../../entities/Acts/Cashbox/Encashment'
import {AxiosResponse} from 'axios'

export const EncashmentAPI = {
    getByShop(shopId: number, take: number): Promise<AxiosResponse<Encashment[]>> {
        return (
            $api.get<Encashment[]>(`/encashment/getbyshop?id=${shopId}&take=${take}`)
        )
    },
    setStatusToTransfer(id: number, userId: string): Promise<AxiosResponse<Encashment>> {
        return (
            $api.put(`/encashment/setstatustotransfer?id=${id}&userId=${userId}`)
        )
    },
    setStatusToFinish(id: number, userId: string): Promise<AxiosResponse<Encashment>> {
        return (
            $api.put(`/encashment/setstatustofinish?id=${id}&userId=${userId}`)
        )
    },
}