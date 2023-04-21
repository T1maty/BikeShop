import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface CheckModalStore {
    openCheckModalForShop: boolean
    setOpenCheckModalForShop: (value: boolean) => void
    openCheckModalForService: boolean
    setOpenCheckModalForService: (value: boolean) => void
}

const useCheckModal = create<CheckModalStore>()(persist(devtools(immer((set) => ({
    openCheckModalForShop: false,
    setOpenCheckModalForShop: (value) => set({openCheckModalForShop: value}),
    openCheckModalForService: false,
    setOpenCheckModalForService: (value) => set({openCheckModalForService: value}),
}))), {
    name: "checkModalStore",
    version: 1
}));

export default useCheckModal;