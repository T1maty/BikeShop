import {User} from '../models/Auth/User'

export interface LoginResponse {
    accessToken: string
    user: User
}