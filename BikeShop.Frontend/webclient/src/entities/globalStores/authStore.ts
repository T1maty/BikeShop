import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {devtools, persist} from "zustand/middleware";
import LoginData from "../models/LoginData";
import {AxiosResponse} from "axios/index";
import LoginResponse from "../responses/loginResponse";
import $api from "../../shared/http/axios";
import RefreshResponse from "../responses/RefreshResponse";
import {useNavigate} from "react-router-dom";

interface authState {
    logout: () => void
    checkTokens: () => void;
    login: (loginData: LoginData) => Promise<AxiosResponse<LoginResponse>>;
}

const useAuth = create<authState>()(persist(devtools(immer((set, get) => ({

    login: (loginData: LoginData) => {
        return $api.post<LoginResponse>("/auth/login", loginData);
    },

    checkTokens: () => {
        $api.post<RefreshResponse>('/auth/refresh').then(r => {

            localStorage.setItem('accessToken', r.data.accessToken)
            const navigate = useNavigate();
            navigate("/main", {replace: true});
        })
    },

    logout: () => {
        $api.post('auth/logout')
        localStorage.removeItem('accessToken')
    },

}))), {name: "userStore", version: 1}));

export default useAuth;
