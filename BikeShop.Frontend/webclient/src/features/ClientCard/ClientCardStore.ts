import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";

interface ClientCardStore {
    userId: string
    lastName: string
    firstName: string
    patronymic: string
    phoneNumber: string
    email: string
    balance: number
    creditLimit: number
    setUserId: (value: string) => void
    setLastName: (value: string) => void
    setFirstName: (value: string) => void
    setPatronymic: (value: string) => void
    setPhoneNumber: (value: string) => void
    setEmail: (value: string) => void
    setBalance: (value: number) => void
    setCreditLimit: (value: number) => void
}

const useClientCard = create<ClientCardStore>()(/*persist(*/devtools(immer((set, get) => ({
    userId: '',
    lastName: 'Клиент',
    firstName: 'не',
    patronymic: 'выбран',
    phoneNumber: 'Клиент не выбран',
    email: 'Клиент не выбран',
    balance: 0,
    creditLimit: 0,

    setUserId: (value: string) => set({
        userId: value
    }),
    setLastName: (value: string) => set({
        lastName: value
    }),
    setFirstName: (value: string) => set({
        firstName: value
    }),
    setPatronymic: (value: string) => set({
        patronymic: value
    }),
    setPhoneNumber: (value: string) => set({
        phoneNumber: value
    }),
    setEmail: (value: string) => set({
        email: value
    }),
    setBalance: (value: number) => set({
        balance: value
    }),
    setCreditLimit: (value: number) => set({
        creditLimit: value
    }),
})))/*, {
    name: "clientCardStore",
    version: 1
})*/);

export default useClientCard;