import {AxiosResponse} from "axios"
import {$api} from "shared"
import {LoginData, LoginResponse, RegistrationData, Shop, User} from "../index"
import {SearchClient} from "../../features/ChooseClientModal/ChooseClientModalStore"

export const AuthAPI = {
    Login: {
        login(loginData: LoginData): any {
            return (
                $api.post<LoginResponse>('/auth/login', loginData)
            )
        },
        logout(): any {
            return (
                $api.post('/auth/logout')
            )
        },
        register(data: RegistrationData): any {
            return (
                $api.post<RegistrationData>('/auth/register', data)
            )
        },
        loginToShop(shopId: number): any {
            return (
                $api.get<Array<Shop>>('shop/getall')
            )
        },
    },

    User: {
        findUser(data: SearchClient): any {
            return (
                $api.get<Array<User>>(`/user/find?fio=${data.fio}&phone=${data.phoneNumber}`)
            )
        },
    },
}