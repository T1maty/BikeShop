import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {SupplyInvoiceDTO} from "../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO"
import {SupplyInvoiceAPI} from '../../../entities'
import {ServiceFinalArchiveModal} from './ServiceFinalArchiveModal';

interface ServiceFinalArchiveModalStore {
    openServiceFinalArchiveModal: boolean
    setOpenServiceFinalArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: SupplyInvoiceDTO[]
    getArchive: () => void
}

const useServiceFinalArchiveModal = create<ServiceFinalArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openServiceFinalArchiveModal: false,
    setOpenServiceFinalArchiveModal: (value: boolean) => set({
        openServiceFinalArchiveModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    getArchive: () => {
        set({isLoading: true})
        // заглушка
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
    name: "serviceFinalArchiveModalStore",
    version: 1
})*/);

export default useServiceFinalArchiveModal;