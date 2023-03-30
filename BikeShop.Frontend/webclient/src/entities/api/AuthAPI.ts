import {AxiosResponse} from "axios"
import {$api} from "shared"
import {CreateUser, LoginData, LoginResponse,
    RegistrationData, SearchClient, Shop, User} from "../index"

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
                $api.get<Shop[]>('shop/getall')
            )
        },
    },

    User: {
        findUser(data: SearchClient): any {
            return (
                $api.get<User[]>(`/user/find?fio=${data.fio}&phone=${data.phoneNumber}`)
            )
        },
        addNewUser(data: CreateUser): any {
            return (
                $api.post<CreateUser>('/user/create', data)
            )
        },
    },
}