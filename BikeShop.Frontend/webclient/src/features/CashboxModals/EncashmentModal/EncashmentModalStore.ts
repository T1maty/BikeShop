import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {EncashmentModal} from "./EncashmentModal";

interface EncashmentModalStore {
    openEncashmentModal: boolean
    setOpenEncashmentModal: (value: boolean) => void
}

const useEncashmentModal = create<EncashmentModalStore>()(persist(devtools(immer((set) => ({
    openEncashmentModal: false,
    setOpenEncashmentModal: (value) => set({openEncashmentModal: value}),
}))), {
    name: "encashmentModalStore",
    version: 1
}));

export default useEncashmentModal;