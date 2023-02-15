import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateUser} from '../../entities';
import User from "../../entities/models/User";

export type UserDefault = {
    id: number
    fio: string
}

interface ChooseClientModalStore {
    chooseClientModal: boolean
    setChooseClientModal: (value: boolean) => void

    addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>

    usersD: any[]
    findUser: (fio: string) => Promise<AxiosResponse>
    getUsers: () => any
    addTestUser: (name: string) => void
    fio: string
    phone: string
    setFirstName: (value: string) => void
    setUsers: (users: any) => void
}

const useChooseClientModal = create<ChooseClientModalStore>()(persist(devtools(immer((set) => ({
    // модалка
    chooseClientModal: false,
    setChooseClientModal: (value: boolean) => set({
        chooseClientModal: value
    }),

    // поиск клиента
    // users: [
    //     {id: 1, firstName: 'Иванов'}
    //     // {id: 2, firstName: 'Petrov', phone: 25010}
    // ],
    usersD: [],

    fio: '',
    phone: '',

    addTestUser: (fio: string) => set( state => {
        state.usersD.push({id: Date.now(), fio: fio})
    }),

    getUsers: () => {
        return $api.get('/user/find').then(res => {
            set(state => {
                // state.usersD.push(...res.data.users)
                state.usersD = [...res.data.users]
            })
        })




        // set({usersD: response.data})
    },
    setUsers: (users: any) => set({
        usersD: [...users]
    }),

    setFirstName: (value: string) => set({
        fio: value
    }),

    findUser: (fio: string) => {
        return $api.get(`/user/find?fio=${fio}`)
    },

    // добавить клиента
    addNewUser: (data) => {
        return $api.post<CreateUser>('/user/create', data)
    }
}))), {
    name: "chooseClientModalStore",
    version: 1
}));

export default useChooseClientModal;