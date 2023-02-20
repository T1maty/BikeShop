import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {$api} from "../../shared";

interface GlobalDataStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    users: any[] // надо исправить тип
    getUsers: () => any // надо исправить тип

    userId: string
    lastName: string
    firstName: string
    patronymic: string
    phoneNumber: string
    // email: string
    balance: number
    creditLimit: number

    setUserId: (value: string) => void
    setCardLastName: (value: string) => void
    setCardFirstName: (value: string) => void
    setCardPatronymic: (value: string) => void
    setCardPhoneNumber: (value: string) => void
    // setCardEmail: (value: string) => void
    setBalance: (value: number) => void
    setCreditLimit: (value: number) => void
}

const useGlobalDataStore = create<GlobalDataStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),

    users: [],

    userId: '',
    lastName: 'Клиент',
    firstName: 'не',
    patronymic: 'выбран',
    phoneNumber: 'Клиент не выбран',
    // email: 'Клиент не выбран',
    balance: 0,
    creditLimit: 0,

    setUserId: (value: string) => set({
        userId: value
    }),
    setCardLastName: (value: string) => set({
        lastName: value
    }),
    setCardFirstName: (value: string) => set({
        firstName: value
    }),
    setCardPatronymic: (value: string) => set({
        patronymic: value
    }),
    setCardPhoneNumber: (value: string) => set({
        phoneNumber: value
    }),
    // setCardEmail: (value: string) => set({
    //     email: value
    // }),
    setBalance: (value: number) => set({
        balance: value
    }),
    setCreditLimit: (value: number) => set({
        creditLimit: value
    }),

    getUsers: () => {
        set({isLoading: true});
        return $api.get('/user/find').then(res => {
            set(state => {
                // state.users.push(...res.data.users)
                state.users = [...res.data.users]
            })
            set({isLoading: false});
        })
    },
})))/*, {
    name: globalDataStore",
    version: 1
})*/);

export default useGlobalDataStore;