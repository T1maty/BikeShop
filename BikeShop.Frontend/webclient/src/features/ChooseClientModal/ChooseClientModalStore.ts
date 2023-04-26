import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {AxiosResponse} from "axios"
import {AuthAPI, CreateUser, SearchClient, User} from '../../entities'

interface ChooseClientModalStore {
    openClientModal: boolean
    setOpenClientModal: (value: boolean) => void
    isLoadingDiv: boolean
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    users: User[]
    setUsers: (users: any) => void
    fio: string
    setFIO: (value: string) => void
    phoneNumber: string
    setPhoneNumber: (value: string) => void

    findUser: (data: SearchClient) => any
    addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>
}

const useChooseClientModal = create<ChooseClientModalStore>()(/*persist(*/devtools(immer((set) => ({
    openClientModal: false,
    setOpenClientModal: (value) => set({openClientModal: value}),
    isLoadingDiv: false,
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),

    users: [],
    setUsers: (users) => set({users: users}),
    fio: '',
    setFIO: (value) => set({fio: value}),
    phoneNumber: '',
    setPhoneNumber: (value) => set({phoneNumber: value}),

    findUser: (data) => {
        set({isLoadingDiv: true})
        AuthAPI.User.findUser(data)
            .then((res: any) => {
            set(state => {state.users = [...res.data.users]})
            set({isLoadingDiv: false})
        }).catch((error: any) => {
            console.log('пользователь не найден', error)
        })
    },
    addNewUser: (data) => {
        return AuthAPI.User.addNewUser(data)
    },
})))/*, {
    name: "chooseClientModalStore",
    version: 1
})*/);

export default useChooseClientModal;