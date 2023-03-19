import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface ConfirmModalStore {
    openConfirmModal: boolean
    setOpenConfirmModal: (value: boolean) => void
}

const useConfirmModal = create<ConfirmModalStore>()(persist(devtools(immer((set) => ({
    openConfirmModal: false,
    setOpenConfirmModal: (value) => set({openConfirmModal: value}),
}))), {
    name: "confirmModalStore",
    version: 1
}));

export default useConfirmModal;