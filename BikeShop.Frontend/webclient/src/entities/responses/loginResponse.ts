import User from "../models/User";

export default interface LoginResponse {
    accessToken: string,
    user: User
}