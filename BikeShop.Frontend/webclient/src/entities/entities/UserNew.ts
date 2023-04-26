import {User} from '../models/Auth/User'

export interface UserNew {
    user: User
    userRoles: string[]
}