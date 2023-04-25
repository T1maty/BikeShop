import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface ChangeProductPricesModalStore {
    openChangeProductPricesModal: boolean
    setOpenChangeProductPricesModal: (value: boolean) => void
}

const useChangeProductPricesModal = create<ChangeProductPricesModalStore>()(persist(devtools(immer((set) => ({
    openChangeProductPricesModal: false,
    setOpenChangeProductPricesModal: (value) => set(
        {openChangeProductPricesModal: value}),
}))), {
    name: "changeProductPricesModalStore",
    version: 1
}));

export default useChangeProductPricesModal;