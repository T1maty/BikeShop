import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";

interface ClientCardStore {
    firstName: string
    lastName: string
    patronymic: string
    phone: string
    email: string
    balance: number
    creditLimit: number
    // addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>
}

const useClientCard = create<ClientCardStore>()(persist(devtools(immer((set) => ({
    firstName: 'Клиент не выбран',
    lastName: '',
    patronymic: '',
    phone: 'Клиент не выбран',
    email: 'Клиент не выбран',
    balance: 0,
    creditLimit: 0,

    // addNewUser: (data) => {
    //     return $api.post<CreateUser>('/user/create', data)
    // }
}))), {
    name: "clientCardStore",
    version: 1
}));

export default useClientCard;