import {$api} from "../../../shared"
import {Encashment} from '../../entities/Acts/Cashbox/Encashment'
import {AxiosResponse} from 'axios'
import {CreateEncashment} from "../../requests/CreateEncashment";

export const EncashmentAPI = {
    getByShop(shopId: string, take: number): Promise<AxiosResponse<Encashment[]>> {
        return (
            $api.get<Encashment[]>(`/encashment/getbyshop?ShopId=${shopId}&Take=${take}`)
        )
    },
    setStatusToTransfer(id: number, userId: string): Promise<AxiosResponse<Encashment>> {
        return (
            $api.put(`/encashment/setstatustotransfer?Id=${id}&UserId=${userId}`)
        )
    },
    setStatusToFinish(id: number, userId: string): Promise<AxiosResponse<Encashment>> {
        return (
            $api.put(`/encashment/setstatustofinish?Id=${id}&UserId=${userId}`)
        )
    },
    create(data: CreateEncashment): Promise<AxiosResponse<Encashment>> {
        return (
            $api.post(`/encashment/create`, data)
        )
    },
}