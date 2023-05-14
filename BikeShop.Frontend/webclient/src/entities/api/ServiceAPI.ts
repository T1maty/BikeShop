import {AxiosResponse} from 'axios'
import {$api} from 'shared'
import {GetUsersResponse} from '../responses/GetUsersResponse'
import {ServiceWithData} from "../models/ServiceWithData"
import {LocalStorage} from "../globalStore/LocalStorage"
import {Work} from "../models/Service/Work"
import {UpdateServiceStatus} from "../requests/UpdateServiceStatus"

export const ServiceAPI = {
    getMasters(): any {
        return (
            $api.get<GetUsersResponse[]>('/user/find')
        )
    },
    getAllServicesInfo(): Promise<AxiosResponse<ServiceWithData[]>> {
        return (
            $api.get<ServiceWithData[]>(`/service/getbyshopid/${LocalStorage.shopId()}`)
        )
    },
    addNewService(data: any): Promise<AxiosResponse<ServiceWithData>> {
        return (
            $api.post<ServiceWithData>('/service/create', data)
        )
    },
    updateService(updateData: any): Promise<AxiosResponse<ServiceWithData>> {
        return (
            $api.put<ServiceWithData>('/service/updateservice', updateData)
        )
    },
    updateServiceStatus(data: UpdateServiceStatus): Promise<AxiosResponse<ServiceWithData>> {
        return (
            $api.put<ServiceWithData>(`/service/updateservicestatus?id=${data.id}&status=${data.status}`, data)
        )
    },
    searchWork: function (querry: string): Promise<AxiosResponse<Work[]>> {
        return (
            $api.get<Work[]>(`/work/search?Querry=${querry}`)
        )
    },
}