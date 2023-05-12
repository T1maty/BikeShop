import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {AxiosResponse} from "axios"
import {User} from '../../../entities'

interface MainPageStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    isClientChosen: boolean
    setIsClientChosen: (value: boolean) => void
    user: User
    setUser: (user: User) => void
}

const useMainPageStore = create<MainPageStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),
    isClientChosen: false,
    setIsClientChosen: (value) => set({isClientChosen: value}),
    user: {
        shopId: 0,
        id: '',
        lastName: 'Клиент',
        firstName: 'не',
        patronymic: 'выбран',
        balance: 0,
        balanceCurrencyId: 0,
        creditLimit: 0,
        phoneNumber: '',
        phoneNumberConfirmed: false,
        email: '',
        emailConfirmed: false
    },
    setUser: (user: User) => set({user: user}),
})))/*, {
    name: "mainPageStore",
    version: 1
})*/);

export default useMainPageStore;