import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface AddProductCardTagModalStore {
    openAddProductCardTagModal: boolean
    setOpenAddProductCardTagModal: (value: boolean) => void
}

const useAddProductCardTagModal = create<AddProductCardTagModalStore>()(persist(devtools(immer((set) => ({
    openAddProductCardTagModal: false,
    setOpenAddProductCardTagModal: (value) => set({openAddProductCardTagModal: value}),
}))), {
    name: "addProductCardTagModal",
    version: 1
}));

export default useAddProductCardTagModal;