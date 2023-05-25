import { AxiosResponse } from "axios";
import { ErrorStatusTypes } from "entities/enumerables/ErrorStatusTypes";
import { create } from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer"
import { UserInfoType } from "./ClientSearchModal";
import { AuthAPI } from "../../entities/api/AuthAPI";
import { SearchClient } from "entities/models/Auth/SearchClient";
import { CreateUser } from "entities/requests/CreateUser";

interface AddNewUserStore {
    isLoading: boolean,
    errorStatus: string,
    setError: (value: string) => void,
    users: UserInfoType[],
    setUsers: (users: UserInfoType[]) => void,
    create: (data: CreateUser, onSuccess?: (response: AxiosResponse) => void, onFailure?: (response: AxiosResponse) => void) => void
    findUser: (data: SearchClient) => void

}
export const useAddNewUser = create<AddNewUserStore>()(devtools(immer((set, get) => ({
    isLoading: false,

    errorStatus: '',
    setError: (value) => set({errorStatus: value}),

    users: [],
    setUsers: (users) => set({users: users}),

    // создание нового пользователя

    create: (data, onSuccess, onFailure) => {
        set({isLoading: true})
        AuthAPI.User.addNewUser(data).then((r: AxiosResponse) => {
            onSuccess ? onSuccess(r) : false
            set({isLoading: false})
        }).catch((r: AxiosResponse) => {
            onFailure ? onFailure(r) : false
        }).finally(() => {
            set({isLoading: false})
        })
    },

    // поиск пользователя по ФИО или телефону

    findUser: (data) => {
        set({isLoading: true})
        AuthAPI.User.findUser(data)
            .then((res: AxiosResponse) => {
            set(state => {state.users = [...res.data.users]})

            const users = get().users
            if (users.length == 0) {
                set({errorStatus: 'пользователь не найден'})
            }
            
            set({isLoading: false})
        }).catch((res: AxiosResponse) => {
            set({errorStatus: 'ошибка'})
        }).finally(() => {
            set({isLoading: false})
        })
    },
}))));