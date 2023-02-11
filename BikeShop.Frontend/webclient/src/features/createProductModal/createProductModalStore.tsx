import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface createProductModalStore {
    open: boolean,
    setOpen: (value: boolean) => void,
}

const useCreateProductModal = create<createProductModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    setOpen: (value) => set({open: value})
}))), {
    name: "creatProductModalStore",
    version: 1
}));

export default useCreateProductModal