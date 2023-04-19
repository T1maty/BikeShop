import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {User} from "../models/Auth/User";
import {Shop} from "../models/Auth/Shop";
import {LoginData} from "../models/Auth/LoginData";
import {AxiosResponse} from "axios";
import {LoginResponse} from "../responses/LoginResponse";
import {AuthAPI} from "../api/AuthAPI";
import {RegistrationData} from "../models/Auth/RegistrationData";
import {immer} from "zustand/middleware/immer";


interface ChooseDiscountModalStore {
    user: User | undefined
    shop: Shop | undefined

    login: (loginData: LoginData, callback?: (value: LoginResponse) => void) => void
    logout: () => Promise<AxiosResponse>
    register: (data: RegistrationData, onSuccess?: (response: AxiosResponse) => void, onFailure?: (response: AxiosResponse) => void) => void
    loginToShop: (shopId: number) => void
}

export const useAuth = create<ChooseDiscountModalStore>()(persist(devtools(immer((set) => ({
    user: undefined,
    shop: undefined,

    login: (loginData, callback) => {
        AuthAPI.Login.login(loginData).then((r: AxiosResponse<LoginResponse>) => {
            localStorage.setItem('accessToken', r.data.accessToken)
            localStorage.setItem('userId', r.data.user.id)
            localStorage.setItem('shopId', r.data.user.shopId.toString())
            callback ? callback(r.data) : false
        })
    },

    logout: () => {

        set(state => {
            state.user = undefined
            state.shop = undefined
        })
        localStorage.removeItem('accessToken')
        return AuthAPI.Login.logout()
    },

    register: (data, onSuccess, onFailure) => {
        AuthAPI.Login.register(data).then((r: AxiosResponse) => {
            onSuccess ? onSuccess(r) : false
        }).catch((r: AxiosResponse) => {
            onFailure ? onFailure(r) : false
        })
    },

    loginToShop: (shopId) => {
        AuthAPI.Login.loginToShop(shopId).then((r: any) => {
            let shop = r.data.filter((n: any) => n.id === shopId)[0]
            set(state => {
                state.shop = shop
            })
            console.log(shop)
        })
    },
}))), {
    name: "AuthStore",
    version: 1
}));