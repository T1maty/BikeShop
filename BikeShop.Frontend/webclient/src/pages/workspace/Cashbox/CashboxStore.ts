import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {IUser} from '../../../entities';

interface CashboxStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    user: IUser
    setUser: (user: IUser) => void
}

const useCashboxStore = create<CashboxStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),
    user: {
        // id: '',
        // shopId: 0,
        // lastName: 'Клиент',
        // firstName: 'не',
        // patronymic: 'выбран',
        // balance: 0,
        // balanceCurrencyId: 0,
        // creditLimit: 0,
        // phoneNumber: '',
        // phoneNumberConfirmed: false,
        // email: '',
        // emailConfirmed: false
    } as IUser,
    setUser: (user: IUser) => set({
        user: user
    }),
})))/*, {
    name: "cashboxStore",
    version: 1
})*/);

export default useCashboxStore;