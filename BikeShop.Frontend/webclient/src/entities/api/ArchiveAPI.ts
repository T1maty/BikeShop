import {AxiosResponse} from "axios"
import { $api } from "shared"
import {CreateServiceResponse} from "../responses/CreateServiceResponse"

export const ArchiveAPI = {
    getAllServicesInfo(): Promise<AxiosResponse<Array<any>>> {
        return (
            $api.get<Array<any>>('/service/getbyshopid/1')
        )
    },
}