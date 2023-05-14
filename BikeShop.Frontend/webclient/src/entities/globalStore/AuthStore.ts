import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {User} from "../models/Auth/User"
import {Shop} from "../models/Auth/Shop"
import {LoginData} from "../models/Auth/LoginData"
import {AxiosResponse} from "axios"
import {LoginResponse} from "../responses/LoginResponse"
import {AuthAPI} from "../api/AuthAPI"
import {RegistrationData} from "../models/Auth/RegistrationData"
import {immer} from "zustand/middleware/immer"
import {LocalStorage} from "./LocalStorage"
import {ErrorStatusTypes} from "../enumerables/ErrorStatusTypes"

interface AuthStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    isAuth: boolean
    setIsAuth: (value: boolean) => void
    errorStatus: ErrorStatusTypes
    setErrorStatus: (value: ErrorStatusTypes) => void

    user: User | undefined
    shop: Shop | undefined

    login: (loginData: LoginData, callback?: (value: LoginResponse) => void, onFailure?: (value: AxiosResponse) => void) => void
    logout: () => Promise<AxiosResponse>
    register: (data: RegistrationData, onSuccess?: (response: AxiosResponse) => void, onFailure?: (response: AxiosResponse) => void) => void
    loginToShop: (shopId: number) => void

    updateUserData: () => void
}

export const useAuth = create<AuthStore>()(persist(devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),
    isAuth: false,
    setIsAuth: (value) => set({isAuth: value}),
    errorStatus: 'default',
    setErrorStatus: (value) => set({errorStatus: value}),

    user: undefined,
    shop: undefined,

    login: (loginData, callback, onFailure) => {
        set({isLoading: true})
        AuthAPI.Login.login(loginData).then((r: AxiosResponse<LoginResponse>) => {
            console.log('login store', r)

            localStorage.setItem('accessToken', r.data.accessToken)
            localStorage.setItem('userId', r.data.user.id)
            localStorage.setItem('shopId', r.data.user.shopId.toString())

            set(state => {
                state.user = r.data.user
            })

            console.log('login user', r.data.user)

            if (r.data.user.shopId > 0) {
                set(state => {
                    state.loginToShop(r.data.user.shopId)
                })
            }

            callback ? callback(r.data) : false
            set({isLoading: false})
        }).catch(((r: AxiosResponse<LoginResponse>) => {
            console.log('login error', r)
            onFailure ? onFailure(r) : false
        })).finally(() => {
            set({isLoading: false})
        })
    },

    logout: () => {
        set(state => {
            state.user = undefined
            state.shop = undefined
        })

        localStorage.removeItem('accessToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('shopId')

        return AuthAPI.Login.logout()
    },

    register: (data, onSuccess, onFailure) => {
        set({isLoading: true})
        AuthAPI.Login.register(data).then((r: AxiosResponse) => {
            onSuccess ? onSuccess(r) : false
            set({isLoading: false})
        }).catch((r: AxiosResponse) => {
            onFailure ? onFailure(r) : false
        }).finally(() => {
            set({isLoading: false})
        })
    },

    loginToShop: (shopId) => {
        AuthAPI.Login.getShopById(shopId).then(r => {
            set(state => {
                state.shop = r.data
            })
        })
    },

    updateUserData: () => {
        let user = get().user
        let oldShopId = LocalStorage.shopId()
        if (user !== undefined)
            AuthAPI.User.getUserById(user.id).then((r) => {
                localStorage.setItem('shopId', r.data.shopId.toString())
                set(state => {
                    state.user = r.data
                })

                if (r.data.shopId.toString() != oldShopId && r.data.shopId != 0) {
                    set(state => {
                        state.loginToShop(r.data.shopId)
                    })
                }
            })
    }
}))), {
    name: "authStore",
    version: 1
}));