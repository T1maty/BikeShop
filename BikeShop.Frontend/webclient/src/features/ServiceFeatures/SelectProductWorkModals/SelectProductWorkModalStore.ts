import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface SelectProductWorkModalStore {
    openSelectProductModal: boolean
    setOpenSelectProductModal: (value: boolean) => void
    openSelectWorkModal: boolean
    setOpenSelectWorkModal: (value: boolean) => void
}

const useSelectProductWorkModal = create<SelectProductWorkModalStore>()(/*persist(*/devtools(immer((set) => ({
    openSelectProductModal: false,
    setOpenSelectProductModal: (value) => set({openSelectProductModal: value}),
    openSelectWorkModal: false,
    setOpenSelectWorkModal: (value) => set({openSelectWorkModal: value})
})))/*, {
    name: "selectProductWorkModalStore",
    version: 1
})*/);

export default useSelectProductWorkModal;