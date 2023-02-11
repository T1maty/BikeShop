import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface ChooseClientModalStore {
    chooseClientModal: boolean
    setChooseClientModal: (value: boolean) => void
}

const useChooseClientModal = create<ChooseClientModalStore>()(persist(devtools(immer((set) => ({
    chooseClientModal: false,

    setChooseClientModal: (value) => set({
        chooseClientModal: value
    }),
}))), {
    name: "chooseClientModalStore",
    version: 1
}));

export default useChooseClientModal