import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {SupplyInvoiceDTO} from "../../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO";
import {SupplyInvoiceProduct} from "../../../../entities/entities/Acts/SupplyInvoice/SupplyInvoiceProduct";

interface SupplyInvoiceStore {
    currentSupplyInvoice: SupplyInvoiceDTO
    setCurrentSupplyInvoice: (value: SupplyInvoiceDTO) => void
    setProducts: (value: SupplyInvoiceProduct[]) => void

    isCreating: boolean,
    setIsCreating: (value: boolean) => void

    visible: boolean,
    setVisible: (value: boolean) => void
}

const useSupplyInvoice = create<SupplyInvoiceStore>()(/*persist(*/devtools(immer((set, get) => ({
    currentSupplyInvoice: {supplyInvoiceProducts: []} as unknown as SupplyInvoiceDTO,
    setCurrentSupplyInvoice: (value) => {
        set(state => {
            state.currentSupplyInvoice = value
        })
    },
    setProducts: (value) => {
        set(state => {
            state.currentSupplyInvoice.supplyInvoiceProducts = value
        })
    },

    isCreating: true,
    setIsCreating: (value) => {
        set(state => {
            state.isCreating = value
        })
    },

    visible: false,
    setVisible: (value) => {
        set(state => {
            state.visible = value
        })
    }
})))/*, {
    name: "cashboxStore",
    version: 1
})*/);

export default useSupplyInvoice;