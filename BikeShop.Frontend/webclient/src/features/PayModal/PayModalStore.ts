import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface PayModalStore {
    openPayModal: boolean
    setOpenPayModal: (value: boolean) => void
}

const usePayModal = create<PayModalStore>()(persist(devtools(immer((set) => ({
    openPayModal: false,
    setOpenPayModal: (value) => set({openPayModal: value}),
}))), {
    name: "choosePayModalStore",
    version: 1
}));

export default usePayModal;