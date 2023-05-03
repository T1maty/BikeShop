import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes";
import {BillWithProducts, FinancialInteractionAPI, LocalStorage} from "../../../entities";

interface CheckArchiveModalStore {
    openCheckArchiveModal: boolean
    setOpenCheckArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: BillWithProducts[]
    loadArchive: () => void // надо исправить тип
}

const useCheckArchiveModal = create<CheckArchiveModalStore>()(persist(devtools(immer((set) => ({
    openCheckArchiveModal: false,
    setOpenCheckArchiveModal: (value) => set(
        {openCheckArchiveModal: value}),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    // заглушка

    loadArchive: () => {
        set({isLoading: true});
        FinancialInteractionAPI.getByShop(LocalStorage.shopId()!, 100).then(res => {
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

}))), {
    name: "checkArchiveModalStore",
    version: 1
}));

export default useCheckArchiveModal;