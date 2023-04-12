import {AxiosResponse} from 'axios'
import {$api} from 'shared'
import {GetUsersResponse} from '../responses/GetUsersResponse'
import {ServiceItem} from '../models/Service/ServiceItem'
import {CreateService} from '../requests/CreateService'
import {UpdateServiceStatus} from '../requests/UpdateService'

export const ServiceAPI = {
    getMasters(): any {
        return (
            $api.get<GetUsersResponse[]>('/user/find')
        )
    },
    getAllServicesInfo(): Promise<AxiosResponse<ServiceItem[]>> {
        return (
            $api.get<ServiceItem[]>('/service/getbyshopid/1')
        )
    },
    addNewService(data: CreateService): any {
        return (
            $api.post<CreateService[]>('/service/create', data)
        )
    },
    updateService(updateData: CreateService): any {
        return (
            $api.put<CreateService[]>('/service/updateservice', updateData)
        )
    },
    updateServiceStatus(data: UpdateServiceStatus): any {
        return (
            $api.put<CreateService[]>(`/service/updateservicestatus?id=${data.id}&status=${data.status}`, data)
        )
    },
}