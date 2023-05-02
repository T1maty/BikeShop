import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {ServiceAPI} from "../../../entities"

interface StorageProductsTransferArchiveModalStore {
    openStorageProductsTransferArchiveModal: boolean
    setOpenStorageProductsTransferArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: any[]
    getTransferProducts: () => any // надо исправить тип
}

const useStorageProductsTransferArchiveModalStore = create<StorageProductsTransferArchiveModalStore>()(persist(devtools(immer((set) => ({
    openStorageProductsTransferArchiveModal: false,
    setOpenStorageProductsTransferArchiveModal: (value) => set(
        {openStorageProductsTransferArchiveModal: value}),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    // заглушка
    getTransferProducts: () => {
        set({isLoading: true});
        return ServiceAPI.getAllServicesInfo().then(res => {
            set(state => {
                state.archive = res.data
                    .filter((item) => item.service.status === 'Ended')
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
    name: "storageProductsTransferArchiveModalStoreStore",
    version: 1
}));

export default useStorageProductsTransferArchiveModalStore;