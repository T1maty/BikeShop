import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface createTagModalStore {
    createTagModal: boolean
    setCreateTagModal: (value: boolean) => void
}

const useCreateTagModal = create<createTagModalStore>()(persist(devtools(immer((set) => ({
    createTagModal: false,

    setCreateTagModal: (value) => set({
        createTagModal: value
    }),
}))), {
    name: "createTagModalStore",
    version: 1
}));

export default useCreateTagModal