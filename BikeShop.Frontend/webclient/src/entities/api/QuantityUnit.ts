import {AxiosResponse} from "axios"
import {$api} from "shared"
import {GetQuantityUnitResponse} from "../responses/QuantityUnitResponse"
import {CreateQuantityUnit, UpdateQuantityUnit} from "../requests/CreateQuantityUnit";

export const QuantityUnitAPI = {
    getQuantityUnits(): Promise<AxiosResponse<Array<GetQuantityUnitResponse>>> {
        return (
            $api.get<Array<GetQuantityUnitResponse>>('/quantityunit/getall')
        )
    },
    addQuantityUnit(data: CreateQuantityUnit): any {
        return (
            $api.post<CreateQuantityUnit>('/quantityunit/create', data)
        )
    },
    updateQuantityUnit(updateData: UpdateQuantityUnit): any {
        return (
            $api.put<UpdateQuantityUnit>('/quantityunit/update', updateData)
        )
    },
}