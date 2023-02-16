import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateUser} from '../../entities';
import User from "../../entities/models/User";

interface SearchClient {
    fio: string
    phone: string
}

interface ChooseClientModalStore {
    chooseClientModal: boolean
    setChooseClientModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    users: User[]
    fio: string
    phone: string
    getUsers: () => any // надо исправить тип
    setUsers: (users: any) => void
    setFIO: (value: string) => void
    setPhone: (value: string) => void
    // findUser: (fio: string) => any // надо исправить тип
    findUser: (request: SearchClient) => any // надо исправить тип
    // addTestUser: (name: string) => void
    addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>
}

const useChooseClientModal = create<ChooseClientModalStore>()(/*persist(*/devtools(immer((set) => ({
    // модалка
    chooseClientModal: false,
    setChooseClientModal: (value: boolean) => set({
        chooseClientModal: value
    }),
    // поиск клиента
    isLoading: false,
    setIsLoading: (value: boolean) => set({
       isLoading: value
    }),
    users: [],
    fio: '',
    phone: '',
    getUsers: () => {
        set({isLoading: true});
        return $api.get('/user/find').then(res => {
            set(state => {
                // state.usersD.push(...res.data.users)
                state.users = [...res.data.users]
            })
            set({isLoading: false});
        })
    },
    setUsers: (users: any) => set({
        users: [...users]
    }),
    setFIO: (value: string) => set({
        fio: value
    }),
    setPhone: (value: string) => set({
        phone: value
    }),
    findUser: (request: SearchClient) => {
        set({isLoading: true});
        return $api.get(`/user/find?fio=${request.fio}&phone=${request.phone}`).then(res => {
            set(state => {
                state.users = [...res.data.users]
            })
            set({isLoading: false});
        })
    },
    // добавление клиента
    // addTestUser: (fio: string) => set( state => {
    //     state.users.push({id: Date.now(), fio: fio})
    // }),
    addNewUser: (data) => {
        return $api.post<CreateUser>('/user/create', data)
    }
})))/*, {
    name: "chooseClientModalStore",
    version: 1
})*/);

export default useChooseClientModal;