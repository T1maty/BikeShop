import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {SupplyInvoiceDTO} from "../../../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO";
import {SupplyInvoiceProduct} from "../../../../../entities/entities/Acts/SupplyInvoice/SupplyInvoiceProduct";
import {LocalStorage} from "../../../../../entities";

interface SupplyInvoiceStore {
    currentSupplyInvoice: SupplyInvoiceDTO


    setCurrentSupplyInvoice: (value: SupplyInvoiceDTO) => void
    setProducts: (value: SupplyInvoiceProduct[]) => void

    clearCurrent: () => void

    isCreating: boolean,
    setIsCreating: (value: boolean) => void

    visible: boolean,
    setVisible: (value: boolean) => void
}

const useSupplyInvoice = create<SupplyInvoiceStore>()(persist(devtools(immer((set, get) => ({
    clearCurrent: () => {
        set({
            currentSupplyInvoice: {
                supplyInvoiceProducts: [], supplyInvoice: {
                    shopId: LocalStorage.shopId(),
                    user: LocalStorage.userId(),
                    description: '',
                    additionalPrice: 0,
                    deliveryPrice: 0
                }
            } as unknown as SupplyInvoiceDTO
        })
        set({isCreating: true})
    },

    currentSupplyInvoice: {
        supplyInvoiceProducts: [], supplyInvoice: {
            shopId: LocalStorage.shopId(),
            user: LocalStorage.userId(),
            description: '',
            additionalPrice: 0,
            deliveryPrice: 0
        }
    } as unknown as SupplyInvoiceDTO,
    setCurrentSupplyInvoice: (value) => {
        set(state => {
            state.currentSupplyInvoice = value
        })
    },
    setProducts: (value) => {
        set(state => {
            state.currentSupplyInvoice.supplyInvoiceProducts = value.filter(n => n.quantity != 0)
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
}))), {
    name: "supplyInvoiceStore",
    version: 1
}));

export default useSupplyInvoice;