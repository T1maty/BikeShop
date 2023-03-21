import {create} from "zustand"
import {immer} from "zustand/middleware/immer"
import {devtools, persist} from "zustand/middleware"
import {ILoginData, ILoginResponse, IRegistrationData, IShop, IUser} from "../../entities"
import {$api} from "../../shared"
import {AxiosResponse} from "axios"


interface authState {
    user?: IUser
    shop?: IShop
    setUser: (user: IUser) => void
    setShop: (shop: IShop) => void

    login: (loginData: ILoginData) => Promise<AxiosResponse<ILoginResponse>>
    register: (data: IRegistrationData) => Promise<AxiosResponse>
    loginToShop: (shopId: number) => void

    logout: () => void
}

const useAuth = create<authState>()(persist(devtools(immer((set) => ({

    setUser: (user) => set({user: user}),
    setShop: (shop) => set({shop: shop}),

    login: (loginData) => {
        return $api.post<ILoginResponse>("/auth/login", loginData)
    },

    register: (data) => {
        return $api.post('auth/register', data)
    },

    logout: () => set(state => {
        state.user = {} as IUser
        state.shop = {} as IShop
        $api.post('auth/logout').then(res => {})
        localStorage.removeItem('accessToken')
    }),

    loginToShop: (shopId) => {
        $api.get<IShop[]>('shop/getall').then((r) => {
            let shop = r.data.filter(n => n.id === shopId)[0];
            console.log(shop)
            set(state => {
                state.shop = shop
            });
        })
    }

}))), {name: "useAuthUser", version: 1}));

export default useAuth;
