import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface GetPutMoneyModalStore {
    openGetPutMoneyModal: boolean
    setOpenGetPutMoneyModal: (value: boolean) => void
}

const useGetPutMoneyModal = create<GetPutMoneyModalStore>()(persist(devtools(immer((set) => ({
    openGetPutMoneyModal: false,
    setOpenGetPutMoneyModal: (value) => set({openGetPutMoneyModal: value}),
}))), {
    name: "getPutMoneyModalStore",
    version: 1
}));

export default useGetPutMoneyModal;