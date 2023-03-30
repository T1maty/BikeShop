import {create} from "zustand"
import {immer} from "zustand/middleware/immer"
import {devtools, persist} from "zustand/middleware"
import {AuthAPI, LoginData, LoginResponse, RegistrationData, Shop, User} from "../../entities"
import {AxiosResponse} from "axios"


interface authState {
    user?: User
    shop?: Shop
    setUser: (user: User) => void
    setShop: (shop: Shop) => void

    login: (loginData: LoginData) => Promise<AxiosResponse<LoginResponse>>
    logout: () => void
    register: (data: RegistrationData) => Promise<AxiosResponse>
    loginToShop: (shopId: number) => void
}

const useAuth = create<authState>()(persist(devtools(immer((set) => ({

    setUser: (user) => set({user: user}),
    setShop: (shop) => set({shop: shop}),

    login: (loginData) => {
        return AuthAPI.Login.login(loginData)
    },
    logout: () => set(state => {
        state.user = {} as User
        state.shop = {} as Shop
        AuthAPI.Login.logout().then((res: any) => {})
        localStorage.removeItem('accessToken')
    }),
    register: (data) => {
        return AuthAPI.Login.register(data)
    },

    loginToShop: (shopId) => {
        AuthAPI.Login.loginToShop(shopId).then((r: any) => {
            let shop = r.data.filter((n: any) => n.id === shopId)[0]
            set(state => {state.shop = shop})
            console.log(shop)
        })
    },

}))), {name: "useAuthUser", version: 1}));

export default useAuth;
