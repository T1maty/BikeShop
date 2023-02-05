import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {devtools, persist} from "zustand/middleware";

import {ILoginData, ILoginResponse, IRefreshResponse, IRegistrationData, IUser} from "../index";
import {$api} from "../../shared";


interface authState {
    logout: (setUser: (user: IUser) => void, success?: () => void) => void,
    checkTokens: (success?: () => void, fail?: () => void) => void;
    login: (loginData: ILoginData, setUser: (user: IUser) => void, success?: () => void) => void;
    registration: (data: IRegistrationData, success?: () => void) => void;
}

const useAuth = create<authState>()(persist(devtools(immer((set, get) => ({

    login: (loginData, setUser, success) => set(state => {
        $api.post<ILoginResponse>("/auth/login", loginData).then((r) => {

            localStorage.setItem('accessToken', r.data.accessToken)
            success ? success() : true;

        }).catch((r) => {
            console.log(r)
        })
    }),

    checkTokens: (success, fail) => {
        $api.post<IRefreshResponse>('/auth/refresh').then(r => {

            localStorage.setItem('accessToken', r.data.accessToken)
            success ? success() : true;

        }).catch((r) => {
            localStorage.removeItem('accessToken')
            fail ? fail() : true;
            console.log(r)
        })
    },

    logout: (setUser, success) => {
        $api.post('auth/logout').then(() => {

            localStorage.removeItem('accessToken')
            setUser({} as IUser);
            success ? success() : true;

        }).catch((r) => {
            console.log(r)
        })
    },

    registration: (data, success) => {
        $api.post('auth/register', data).then((r) => {
            success ? success() : true;
        }).catch((r) => {
            console.log(r)
        })

    },

}))), {name: "userStore", version: 1}));

export default useAuth;
