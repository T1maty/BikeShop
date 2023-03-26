import {AxiosResponse} from 'axios'
import {$api} from 'shared'
import {GetUsersResponse} from '../responses/GetUsersResponse'
import {ServiceItem} from '../models/Service/ServiceItem'
import {CreateService} from '../requests/CreateService'
import {UpdateServiceStatus} from '../requests/UpdateService'

export const ServiceAPI = {
    getMasters(): any {
        return (
            $api.get<Array<GetUsersResponse>>('/service/find')
        )
    },
    getAllServicesInfo(): Promise<AxiosResponse<Array<ServiceItem>>> {
        return (
            $api.get<Array<ServiceItem>>('/service/getbyshopid/1')
        )
    },
    addNewService(data: CreateService): any {
        return (
            $api.post<Array<CreateService>>('/service/create', data)
        )
    },
    updateService(updateData: CreateService): any {
        return (
            $api.put<Array<CreateService>>('/service/updateservice', updateData)
        )
    },
    updateServiceStatus(data: UpdateServiceStatus): any {
        return (
            $api.put<Array<CreateService>>(`/service/updateservicestatus?id=${data.id}&status=${data.status}`, data)
        )
    },
}