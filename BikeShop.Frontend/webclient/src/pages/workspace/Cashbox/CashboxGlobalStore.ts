import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {$api} from "../../../shared";

interface CashboxGlobalStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    userId: number | null
    fio: string
    phoneNumber: string
    setFIO: (value: string) => void
    setPhoneNumber: (value: string) => void
}

const useCashboxGlobal = create<CashboxGlobalStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),
    userId: null,
    fio: '',
    setFIO: (value: string) => set({
        fio: value
    }),
    phoneNumber: '',
    setPhoneNumber: (value: string) => set({
        phoneNumber: value
    }),
})))/*, {
    name: "cashboxGlobalStore",
    version: 1
})*/);

export default useCashboxGlobal;