import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface ChooseDiscountModalStore {
    chooseDiscountModal: boolean
    setChooseDiscountModal: (value: boolean) => void
}

const useChooseDiscountModal = create<ChooseDiscountModalStore>()(persist(devtools(immer((set) => ({
    chooseDiscountModal: false,

    setChooseDiscountModal: (value) => set({
        chooseDiscountModal: value
    }),
}))), {
    name: "chooseDiscountModalStore",
    version: 1
}));

export default useChooseDiscountModal;