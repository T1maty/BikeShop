import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateUser} from '../../entities';
import User from "../../entities/models/User";

interface SearchClient {
    fio: string
    phoneNumber: string
}

// export interface APIUser {
//     user: User
// }

interface ChooseClientModalStore {
    chooseClientModal: boolean
    setChooseClientModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    users: User[]
    userId: string
    fio: string
    phoneNumber: string
    getUsers: () => any // надо исправить тип
    setUsers: (users: User[]) => void
    setFIO: (value: string) => void
    setPhoneNumber: (value: string) => void
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
    userId: '',
    fio: '',
    phoneNumber: '',
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
    setUsers: (users: User[]) => set({
        users: [...users]
    }),
    setFIO: (value: string) => set({
        fio: value
    }),
    setPhoneNumber: (value: string) => set({
        phoneNumber: value
    }),
    findUser: (request: SearchClient) => {
        set({isLoading: true});
        return $api.get(`/user/find?fio=${request.fio}&phone=${request.phoneNumber}`).then(res => {
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