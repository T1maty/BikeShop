import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {SupplyInvoiceDTO} from "../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO"
import {SupplyInvoiceAPI} from '../../../entities'

interface EncashmentArchiveModalStore {
    openEncashmentArchiveModal: boolean
    setOpenEncashmentArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: SupplyInvoiceDTO[]
    getArchive: () => void
}

const useEncashmentArchiveModal = create<EncashmentArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openEncashmentArchiveModal: false,
    setOpenEncashmentArchiveModal: (value: boolean) => set({
        openEncashmentArchiveModal: value
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
    name: "encashmentArchiveModalStore",
    version: 1
})*/);

export default useEncashmentArchiveModal;