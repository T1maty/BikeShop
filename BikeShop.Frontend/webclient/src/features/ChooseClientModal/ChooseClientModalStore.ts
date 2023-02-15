import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateUser} from '../../entities';
import User from "../../entities/models/User";

export type UserDefault = {
    id: number
    firstName: string
}

interface ChooseClientModalStore {
    chooseClientModal: boolean
    setChooseClientModal: (value: boolean) => void

    usersD: UserDefault[]
    findUser: (fio: string) => Promise<AxiosResponse>
    addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>
    getUsers: () => any

    addTestUser: (name: string) => void

    firstName: string
    phone: string
    setFirstName: (value: string) => void
}

const useChooseClientModal = create<ChooseClientModalStore>()(persist(devtools(immer((set) => ({
    chooseClientModal: false,
    setChooseClientModal: (value: boolean) => set({
        chooseClientModal: value
    }),

    // users: [
    //     {id: 1, firstName: 'Иванов'}
    //     // {id: 2, firstName: 'Petrov', phone: 25010}
    // ],
    usersD: [],
    firstName: '',
    phone: '',

    addTestUser: (firstName: string) => set( s => {
        s.usersD.push({id: Date.now(), firstName: firstName})
    }),

    getUsers: () => {
        // return $api.get('/user/find').then(res => {
        //     set({users: res})
        // })
    },
    setFirstName: (value: string) => set({
        firstName: value
    }),

    findUser: (fio: string) => {
        return $api.get(`/user/find?fio=${fio}`)
    },
    addNewUser: (data) => {
        return $api.post<CreateUser>('/user/create', data)
    }
}))), {
    name: "chooseClientModalStore",
    version: 1
}));

export default useChooseClientModal;