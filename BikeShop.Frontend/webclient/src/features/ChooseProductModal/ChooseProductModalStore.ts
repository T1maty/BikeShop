import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface ChooseProductModalStore {
    openProductModal: boolean
    setOpenProductModal: (value: boolean) => void
}

const useChooseProductModal = create<ChooseProductModalStore>()(persist(devtools(immer((set) => ({
    openProductModal: false,
    setOpenProductModal: (value) => set({openProductModal: value}),
}))), {
    name: "chooseProductModalStore",
    version: 1
}));

export default useChooseProductModal;