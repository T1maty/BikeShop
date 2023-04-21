import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface CheckModalStore {
    openCheckModal: boolean
    setOpenCheckModal: (value: boolean) => void

    triggerCheckForShop: boolean
    setTriggerCheckForShop: (value: boolean) => void
    triggerCheckForService: boolean
    setTriggerCheckForService: (value: boolean) => void

    openCheckModalForShop: boolean
    setOpenCheckModalForShop: (value: boolean) => void
    openCheckModalForService: boolean
    setOpenCheckModalForService: (value: boolean) => void
}

const useCheckModal = create<CheckModalStore>()(persist(devtools(immer((set) => ({
    openCheckModal: false,
    setOpenCheckModal: (value) => set({openCheckModal: value}),

    triggerCheckForShop: false,
    setTriggerCheckForShop: (value) => set({triggerCheckForShop: value}),
    triggerCheckForService: false,
    setTriggerCheckForService: (value) => set({triggerCheckForService: value}),

    //
    openCheckModalForShop: false,
    setOpenCheckModalForShop: (value) => set({openCheckModalForShop: value}),
    openCheckModalForService: false,
    setOpenCheckModalForService: (value) => set({openCheckModalForService: value}),
}))), {
    name: "checkModalStore",
    version: 1
}));

export default useCheckModal;