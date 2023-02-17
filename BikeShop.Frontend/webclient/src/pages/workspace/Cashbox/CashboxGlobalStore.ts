import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {$api} from "../../../shared";

interface CashboxGlobalStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
}

const useCashboxGlobal = create<CashboxGlobalStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),
})))/*, {
    name: "cashboxGlobalStore",
    version: 1
})*/);

export default useCashboxGlobal;