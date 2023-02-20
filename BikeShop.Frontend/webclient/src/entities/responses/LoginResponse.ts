import {IUser} from '../models/IUser'

export default interface LoginResponse {
    accessToken: string,
    user: IUser
}