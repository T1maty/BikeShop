import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface CheckModalStore {
    openCheckModal: boolean
    setOpenCheckModal: (value: boolean) => void
}

const useCheckModal = create<CheckModalStore>()(persist(devtools(immer((set) => ({
    openCheckModal: false,
    setOpenCheckModal: (value) => set({openCheckModal: value}),
}))), {
    name: "checkModalStore",
    version: 1
}));

export default useCheckModal;