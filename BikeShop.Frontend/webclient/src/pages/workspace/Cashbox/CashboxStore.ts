import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {User} from '../../../entities';

interface CashboxStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    user: User
    setUser: (user: User) => void
}

const useCashboxStore = create<CashboxStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),
    user: {} as User,
    setUser: (user: User) => set({
        user: user
    }),
})))/*, {
    name: "cashboxStore",
    version: 1
})*/);

export default useCashboxStore;