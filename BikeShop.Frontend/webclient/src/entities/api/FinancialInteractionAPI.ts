import {LoginData} from "../models/Auth/LoginData";
import {$api} from "../../shared";
import {LoginResponse} from "../responses/LoginResponse";

export const AuthAPI = {
    Login: {
        login(loginData: LoginData): any {
            return (
                $api.post<LoginResponse>('/auth/login', loginData)
            )
        },
    }
}