import {create} from "zustand"
import {immer} from "zustand/middleware/immer"
import {devtools, persist} from "zustand/middleware"
import {LoginData, LoginResponse, RegistrationData, Shop, User} from "../../entities"
import {$api} from "../../shared"
import {AxiosResponse} from "axios"


interface authState {
    user?: User
    shop?: Shop
    setUser: (user: User) => void
    setShop: (shop: Shop) => void

    login: (loginData: LoginData) => Promise<AxiosResponse<LoginResponse>>
    register: (data: RegistrationData) => Promise<AxiosResponse>
    loginToShop: (shopId: number) => void

    logout: () => void
}

const useAuth = create<authState>()(persist(devtools(immer((set) => ({

    setUser: (user) => set({user: user}),
    setShop: (shop) => set({shop: shop}),

    login: (loginData) => {
        return $api.post<LoginResponse>("/auth/login", loginData)
    },

    register: (data) => {
        return $api.post('auth/register', data)
    },

    logout: () => set(state => {
        state.user = {} as User
        state.shop = {} as Shop
        $api.post('auth/logout').then(res => {})
        localStorage.removeItem('accessToken')
    }),

    loginToShop: (shopId) => {
        $api.get<Shop[]>('shop/getall').then((r) => {
            let shop = r.data.filter(n => n.id === shopId)[0];
            console.log(shop)
            set(state => {
                state.shop = shop
            });
        })
    }

}))), {name: "useAuthUser", version: 1}));

export default useAuth;
