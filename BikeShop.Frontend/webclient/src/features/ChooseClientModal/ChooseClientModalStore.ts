import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../shared"
import {AxiosResponse} from "axios"
import {CreateUser, User} from '../../entities'
import {AuthAPI} from "../../entities/api/AuthAPI"

export interface SearchClient {
    fio: string
    phoneNumber: string
}

interface ChooseClientModalStore {
    openClientModal: boolean
    setOpenClientModal: (value: boolean) => void
    isLoading: boolean
    users: User[]
    setUsers: (users: any) => void
    fio: string
    phoneNumber: string
    setFIO: (value: string) => void
    setPhoneNumber: (value: string) => void
    findUser: (data: SearchClient) => any
    addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>
}

const useChooseClientModal = create<ChooseClientModalStore>()(/*persist(*/devtools(immer((set) => ({
    openClientModal: false,
    setOpenClientModal: (value) => set({openClientModal: value}),
    isLoading: false,

    users: [],
    setUsers: (users) => set({users: users}),
    fio: '',
    setFIO: (value) => set({fio: value}),
    phoneNumber: '',
    setPhoneNumber: (value) => set({phoneNumber: value}),

    findUser: (data) => {
        set({isLoading: true})
        AuthAPI.User.findUser(data)
            .then((res: any) => {
            set(state => {state.users = [...res.data.users]})
            set({isLoading: false})
        })
    },
    addNewUser: (data) => {return $api.post<CreateUser>('/user/create', data)}
})))/*, {
    name: "chooseClientModalStore",
    version: 1
})*/);

export default useChooseClientModal;