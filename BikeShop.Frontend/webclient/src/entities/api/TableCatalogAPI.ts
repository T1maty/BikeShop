import {$api} from "../../shared"
import {AxiosResponse} from "axios"
import {Group} from '../models/Service/Group'
import {Work} from '../models/Service/Work'

export const TableCatalogAPI = {
    getCatalogGroup(): Promise<AxiosResponse<Group[]>> {
        return (
            $api.get<Group[]>('/group/getbyshopid/1')
        )
    },
    getWorkGroup(id: number): Promise<AxiosResponse<Work[]>> {
        return (
            $api.get<Work[]>(`/work/getbygroupid/${id}`)
        )
    },
    createWork(data: any): Promise<any> {
        return (
            $api.post<any>('/work/create', {data})
        )
    },
    updateWork(data: any): Promise<any> {
        return (
            $api.put<any>('/work/update', {data})
        )
    },
}