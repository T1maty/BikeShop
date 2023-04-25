import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface ChangeProductPriceModalStore {
    openChangeProductPriceModal: boolean
    setOpenChangeProductPriceModal: (value: boolean) => void
}

const useChangeProductPriceModal = create<ChangeProductPriceModalStore>()(persist(devtools(immer((set) => ({
    openChangeProductPriceModal: false,
    setOpenChangeProductPriceModal: (value) => set(
        {openChangeProductPriceModal: value}),
}))), {
    name: "changeProductPriceModalStore",
    version: 1
}));

export default useChangeProductPriceModal;