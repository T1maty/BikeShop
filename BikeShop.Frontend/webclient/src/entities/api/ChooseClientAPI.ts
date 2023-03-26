import {AxiosResponse} from "axios"
import { $api } from "shared"
import {User} from "../models/Auth/User"

export interface SearchClient {
    fio: string
    phoneNumber: string
}

export const ChooseClientAPI = {
    findUser(data: SearchClient): any {
        return (
            $api.get<Array<User>>(`/user/find?fio=${data.fio}&phone=${data.phoneNumber}`)
        )
    },
}