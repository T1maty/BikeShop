import {AxiosResponse} from "axios"
import {$api} from "../../shared/http/axios"
import {
    CreateUser,
    GetUsersResponse,
    LoginData,
    LoginResponse,
    RegistrationData,
    SearchClient,
    Shop,
    User
} from '../index'
import {UserWithRoles} from "../models/Auth/UserWithRoles";

export const AuthAPI = {
    Login: {
        login(loginData: LoginData): Promise<AxiosResponse<any>> {
            return (
                $api.post<LoginResponse>('/auth/login', loginData)
            )
        },

        secretLogin(secret: string): Promise<AxiosResponse<LoginResponse>> {
            return (
                $api.post<LoginResponse>(`/user/secretlogin?secret=${secret}`)
            )
        },

        logout(): Promise<AxiosResponse<any>> {
            return (
                $api.post('/auth/logout')
            )
        },
        register(data: RegistrationData): Promise<AxiosResponse<any>> {
            return (
                $api.post<RegistrationData>('/auth/register', data)
            )
        },
        loginToShop(shopId: number): Promise<AxiosResponse<any>> {
            return (
                $api.get<Shop[]>('shop/getall')
            )
        },
        getShopById(shopId: number): Promise<AxiosResponse<Shop>> {
            return (
                $api.get<Shop>(`/shop/getbyid?ShopId=${shopId}`)
            )
        },
    },

    User: {
        getEmployers(): Promise<AxiosResponse<GetUsersResponse[]>> {
            return (
                $api.get<GetUsersResponse[]>('/user/find')
            )
        },
        getUserById(userId: string): Promise<AxiosResponse<User>> {
            return (
                $api.get<User>(`/user/getbyid?id=${userId}`)
            )
        },
        findUser(data: SearchClient): Promise<AxiosResponse<any>> {
            return (
                $api.get<User[]>(`/user/find?fio=${data.fio}&phone=${data.phoneNumber}`)
            )
        },
        addNewUser(data: CreateUser): Promise<AxiosResponse<User>> {
            return (
                $api.post<User>('/user/create', data)
            )
        },
        updateUserProfile(data: any): Promise<AxiosResponse<any>> {
            return (
                $api.put<any>('/user/updatepublic', data)
            )
        },
        search(querry: string, take: number): Promise<AxiosResponse<UserWithRoles[]>> {
            return (
                $api.get<UserWithRoles[]>(`/user/search?Querry=${querry}&Take=${take}`)
            )
        },
    },
}