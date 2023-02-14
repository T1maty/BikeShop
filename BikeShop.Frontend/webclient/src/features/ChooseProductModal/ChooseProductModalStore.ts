import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface ChooseProductModalStore {
    chooseProductModal: boolean
    setChooseProductModal: (value: boolean) => void
}

const useChooseProductModal = create<ChooseProductModalStore>()(persist(devtools(immer((set) => ({
    chooseProductModal: false,

    setChooseProductModal: (value) => set({
        chooseProductModal: value
    }),
}))), {
    name: "chooseProductModalStore",
    version: 1
}));

export default useChooseProductModal;