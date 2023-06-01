import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {SupplyInvoiceDTO} from "../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO"
import {SupplyInvoiceAPI} from '../../../entities'

interface SupplyInvoiceArchiveModalStore {
    openSupplyInvoiceArchiveModal: boolean
    setOpenSupplyInvoiceArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: SupplyInvoiceDTO[]
    getArchive: () => void
    setArchive: (value: SupplyInvoiceDTO[]) => void

    selectedSupplyInvoice: SupplyInvoiceDTO | null
    setSelectedSupplyInvoice: (value: SupplyInvoiceDTO) => void


}

const useSupplyInvoiceArchiveModal = create<SupplyInvoiceArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    selectedSupplyInvoice: null,
    setSelectedSupplyInvoice: (value) => {
        set(state => {
            state.selectedSupplyInvoice = value
        })
    },
    setArchive: (value) => {
        set({archive: value})
    },
    openSupplyInvoiceArchiveModal: false,
    setOpenSupplyInvoiceArchiveModal: (value) => set({
        openSupplyInvoiceArchiveModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    getArchive: () => {
        set({isLoading: true})
        SupplyInvoiceAPI.getByShop(1, 100).then((res: any) => {
            set(state => {
                state.archive = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "supplyInvoiceArchiveModalStore",
    version: 1
})*/);

export default useSupplyInvoiceArchiveModal;