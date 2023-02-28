import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface SelectProductWorkModalStore {
    selectProductModal: boolean
    setSelectProductModal: (value: boolean) => void
    selectWorkModal: boolean
    setSelectWorkModal: (value: boolean) => void
}

const useSelectProductWorkModal = create<SelectProductWorkModalStore>()(/*persist(*/devtools(immer((set) => ({
    selectProductModal: false,
    setSelectProductModal: (value) => set({selectProductModal: value}),
    selectWorkModal: false,
    setSelectWorkModal: (value) => set({selectWorkModal: value})
})))/*, {
    name: "selectProductWorkModalStore",
    version: 1
})*/);

export default useSelectProductWorkModal;