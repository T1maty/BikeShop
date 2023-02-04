import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {devtools, persist} from "zustand/middleware";

import {useNavigate} from "react-router-dom";

import {ILoginData, ILoginResponse, IRefreshResponse, IRegistrationData} from "../index";
import {$api} from "../../shared";
import useUserData from "./userStore";


interface authState {
    logout: (redirect?: string) => void
    checkTokens: (redirect?: string) => void;
    login: (loginData: ILoginData, redirect?: string) => void;
    registration: (data: IRegistrationData, redirect?: string) => void;
}

const useAuth = create<authState>()(persist(devtools(immer((set, get) => ({

    login: (loginData, redirect = '') => {
        $api.post<ILoginResponse>("/auth/login", loginData).then((r) => {

            localStorage.setItem('accessToken', r.data.accessToken)
            const setUser = useUserData(s => s.setUser);
            setUser(r.data.user);

            if (redirect.length > 0) {
                const navigate = useNavigate();
                navigate(redirect, {replace: true})
            }


        }).catch((r) => {
            console.log(r)
        })
    },

    checkTokens: (redirect = '') => {
        $api.post<IRefreshResponse>('/auth/refresh').then(r => {

            localStorage.setItem('accessToken', r.data.accessToken)

            if (redirect.length > 0) {
                const navigate = useNavigate();
                navigate(redirect, {replace: true})
            }

        }).catch((r) => {
            console.log(r)
        })
    },

    logout: (redirect = '') => {
        $api.post('auth/logout').then(() => {
            localStorage.removeItem('accessToken')

            if (redirect.length > 0) {
                const navigate = useNavigate();
                navigate(redirect, {replace: true})
            }

        }).catch((r) => {
            console.log(r)
        })
    },

    registration: (data, redirect = '') => {
        $api.post('auth/register', data).then((r) => {
            if (redirect.length > 0) {
                const navigate = useNavigate();
                navigate("/main", {replace: true});
            }
        }).catch((r) => {
            console.log(r)
        })

    },

}))), {name: "userStore", version: 1}));

export default useAuth;
