import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateUser, IProduct} from '../../entities';

interface ChooseClientModalStore {
    chooseClientModal: boolean
    setChooseClientModal: (value: boolean) => void
    firstName: string
    setFirstName: (firstName: string) => void
    lastName: string
    setLastName: (lastName: string) => void
    patronymic: string
    setPatronymic: (patronymic: string) => void
    phone: string
    setPhone: (phone: string) => void
    addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>
}

const useChooseClientModal = create<ChooseClientModalStore>()(persist(devtools(immer((set) => ({
    chooseClientModal: false,
    setChooseClientModal: (value: boolean) => set({
        chooseClientModal: value
    }),

    firstName: '',
    setFirstName: (firstName: string) => set({
        firstName: firstName
    }),
    lastName: '',
    setLastName: (lastName: string) => set({
        lastName: lastName
    }),
    patronymic: '',
    setPatronymic: (patronymic: string) => set({
        patronymic: patronymic
    }),
    phone: '',
    setPhone: (phone: string) => set({
        phone: phone
    }),

    addNewUser: (data) => {
        return $api.post<CreateUser>('/user/create', data)
    }
}))), {
    name: "chooseClientModalStore",
    version: 1
}));

export default useChooseClientModal;