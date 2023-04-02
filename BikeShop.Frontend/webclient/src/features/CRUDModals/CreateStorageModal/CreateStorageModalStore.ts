import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CreateStorageResponse} from '../../../entities/responses/StorageResponse'
import {CreateStorage, UpdateStorage} from '../../../entities/requests/CreateStorage'
import {EntitiesAPI} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"


interface CreateStorageModalStore {
    openCreateStorageModal: boolean
    setOpenCreateStorageModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    currentStorage: CreateStorageResponse | null
    setCurrentStorage: (storage: CreateStorageResponse | null) => void

    storages: CreateStorageResponse[]
    getStorages: () => void
    addNewStorage: (data: CreateStorage) => any
    updateStorageInfo: (updateData: UpdateStorage) => any
}

const useCreateStorageModal = create<CreateStorageModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openCreateStorageModal: false,
    setOpenCreateStorageModal: (value: boolean) => set({openCreateStorageModal: value}),
    isLoading: false,
    errorStatus: 'default',

    currentStorage: null,
    setCurrentStorage: (storage) => {
        set({currentStorage: storage})
    },
    storages: [],
    getStorages: () => {
        set({isLoading: true})
        EntitiesAPI.Storage.getStorages().then(res => {
            set(state => {
                state.storages = res.data
                console.log('все склады', state.storages)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    addNewStorage: (data) => {
        set({isLoading: true})
        EntitiesAPI.Storage.addNewStorage(data).then((res: any) => {
            set(state => {
                state.storages.push(res.data)
            })
            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    updateStorageInfo: (updateData) => {
        set({isLoading: true})
        EntitiesAPI.Storage.updateStorageInfo(updateData).then((res: any) => {
            EntitiesAPI.Storage.getStorages().then(res => {
                set(state => {
                    state.storages = res.data
                    state.currentStorage = null
                })
            })
            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "createShopModal",
    version: 1
})*/);

export default useCreateStorageModal;