import {$api} from "../../shared"
import {AxiosResponse} from "axios"

export const ArchiveAPI = {
    getArchive(): any {
        return (
            $api.get<any>('/public/gettags')
        )
    },
}