import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface CheckArchiveModalStore {
    openCheckArchiveModal: boolean
    setOpenCheckArchiveModal: (value: boolean) => void
}

const useCheckArchiveModal = create<CheckArchiveModalStore>()(persist(devtools(immer((set) => ({
    openCheckArchiveModal: false,
    setOpenCheckArchiveModal: (value) => set(
        {openCheckArchiveModal: value}),
}))), {
    name: "checkArchiveModalStore",
    version: 1
}));

export default useCheckArchiveModal;