import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface ConfirmModalStore {
    confirmModal: boolean
    setConfirmModal: (value: boolean) => void
}

const useConfirmModal = create<ConfirmModalStore>()(persist(devtools(immer((set) => ({
    confirmModal: false,
    setConfirmModal: (value) => set({
        confirmModal: value
    }),
}))), {
    name: "confirmModalStore",
    version: 1
}));

export default useConfirmModal;