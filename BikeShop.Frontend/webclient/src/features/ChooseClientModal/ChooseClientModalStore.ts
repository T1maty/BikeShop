import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateUser, IUser} from '../../entities';

interface SearchClient {
    fio: string
    phoneNumber: string
}

interface ChooseClientModalStore {
    chooseClientModal: boolean
    setChooseClientModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    users: any[]
    // setUsers: (users: User[]) => void
    fio: string
    phoneNumber: string
    setFIO: (value: string) => void
    setPhoneNumber: (value: string) => void
    // getUsers: () => any // надо исправить тип
    findUser: (data: SearchClient) => any // надо исправить тип
    addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>
}

const useChooseClientModal = create<ChooseClientModalStore>()(/*persist(*/devtools(immer((set) => ({
    chooseClientModal: false,
    setChooseClientModal: (value: boolean) => set({
        chooseClientModal: value
    }),
    isLoading: false,
    setIsLoading: (value: boolean) => set({
       isLoading: value
    }),

    users: [],
    // setUsers: (users: User[]) => set({
    //     users: [...users]
    // }),
    fio: '',
    setFIO: (value: string) => set({
        fio: value
    }),
    phoneNumber: '',
    setPhoneNumber: (value: string) => set({
        phoneNumber: value
    }),

    // getUsers: () => {
    //     set({isLoading: true});
    //     return $api.get('/user/find').then(res => {
    //         set(state => {
    //             // state.users.push(...res.data.users)
    //             state.users = [...res.data.users]
    //         })
    //         set({isLoading: false});
    //     })
    // },
    findUser: (data: SearchClient) => {
        set({isLoading: true});
        return $api.get(`/user/find?fio=${data.fio}&phone=${data.phoneNumber}`)
            .then(res => {
            set(state => {state.users = [...res.data.users]})
            set({isLoading: false})
        })
    },
    addNewUser: (data) => {
        return $api.post<CreateUser>('/user/create', data)
    }
})))/*, {
    name: "chooseClientModalStore",
    version: 1
})*/);

export default useChooseClientModal;