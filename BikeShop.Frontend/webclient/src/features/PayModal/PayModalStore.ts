import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface PayModalStore {
    payModal: boolean
    setPayModal: (value: boolean) => void
}

const usePayModal = create<PayModalStore>()(persist(devtools(immer((set) => ({
    payModal: false,

    setPayModal: (value) => set({
        payModal: value
    }),
}))), {
    name: "choosePayModalStore",
    version: 1
}));

export default usePayModal;