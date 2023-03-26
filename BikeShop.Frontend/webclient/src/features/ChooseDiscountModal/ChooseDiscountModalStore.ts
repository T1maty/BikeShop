import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface ChooseDiscountModalStore {
    openDiscountModal: boolean
    setOpenDiscountModal: (value: boolean) => void
}

const useChooseDiscountModal = create<ChooseDiscountModalStore>()(persist(devtools(immer((set) => ({
    openDiscountModal: false,
    setOpenDiscountModal: (value) => set({openDiscountModal: value}),
}))), {
    name: "chooseDiscountModalStore",
    version: 1
}));

export default useChooseDiscountModal;