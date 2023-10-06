import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface p {
    open: boolean
    setOpen: (v: boolean) => void
    selectedPage: 1 | 2 | 3
    setSelectedPage: (v: 1 | 2 | 3) => void
    isDirty: boolean
}


const useOrderModal = create<p>()(persist(devtools(immer((set, get) => ({
    isDirty: false,
    setSelectedPage: (v) => set({selectedPage: v}),
    selectedPage: 1,
    open: false,
    setOpen: v => set({open: v})
}))), {
    name: "orderModal",
    version: 1
}));

export default useOrderModal;