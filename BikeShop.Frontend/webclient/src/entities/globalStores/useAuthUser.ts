import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {devtools, persist} from "zustand/middleware";

import {ILoginData, ILoginResponse, IRegistrationData, IUser} from "../index";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";


interface authState {
    user?: IUser
    setUser: (user: IUser) => void

    login: (loginData: ILoginData) => Promise<AxiosResponse<ILoginResponse>>
    register: (data: IRegistrationData) => Promise<AxiosResponse>

    logout: () => Promise<AxiosResponse>
}

const useAuth = create<authState>()(persist(devtools(immer((set, get) => ({

    setUser: (user) => set({user: user}),

    login: (loginData) => {
        return $api.post<ILoginResponse>("/auth/login", loginData)
    },

    register: (data) => {
        return $api.post('auth/register', data)
    },

    logout: () => {
        return $api.post('auth/logout')
    },

}))), {name: "useAuthUser", version: 1}));

export default useAuth;
