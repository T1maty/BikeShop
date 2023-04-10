import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ArchiveAPI} from '../../entities'
import {ErrorStatusTypes} from "../../entities/enumerables/ErrorStatusTypes"

interface SupplyInvoiceArchiveModalStore {
    openSupplyInvoiceArchiveModalStore: boolean
    setOpenSupplyInvoiceArchiveModalStore: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: any[]
    getArchive: () => void
}

const useSupplyInvoiceArchiveModal = create<SupplyInvoiceArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openSupplyInvoiceArchiveModalStore: false,
    setOpenSupplyInvoiceArchiveModalStore: (value: boolean) => set({
        openSupplyInvoiceArchiveModalStore: value
    }),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    getArchive: () => {
        set({isLoading: true})
        ArchiveAPI.getArchive().then((res: any) => {
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