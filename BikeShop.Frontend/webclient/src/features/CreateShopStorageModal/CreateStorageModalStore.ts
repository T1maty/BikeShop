import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateStorageResponse} from '../../entities/responses/StorageResponse';
import {CreateStorage, UpdateStorage} from '../../entities/requests/CreateStorage';

interface CreateStorageModalStore {
    createStorageModal: boolean
    setOpenCreateStorageModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    currentStorage: CreateStorageResponse | null
    setCurrentStorage: (storage: CreateStorageResponse | null) => void
    storages: CreateStorageResponse[]
    getStorages: () => void
    addNewStorage: (data: CreateStorage) => any
    updateStorageInfo: (updateData: UpdateStorage) => any
}

const useCreateStorageModal = create<CreateStorageModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    createStorageModal: false,
    setOpenCreateStorageModal: (value: boolean) => set({createStorageModal: value}),
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    currentStorage: null,
    setCurrentStorage: (storage) => {set({currentStorage: storage})},
    storages: [],
    getStorages: () => {
        return $api.get<CreateStorageResponse[]>('/storagecrud/getall').then(res => {
            set(state => {
                state.storages = res.data
                console.log('все склады', state.storages)
            })
        }).catch((error: any) => {
            console.log('склады не получены')
        })
    },
    addNewStorage: (data) => {
        return $api.post('/storagecrud/create', data).then(res => {
            // set(state => {
            //     state.storages.push(res.data)
            // })
        }).catch((error: any) => {
            console.log('склад не создан', error)
        })
    },
    updateStorageInfo: (updateData) => {
        return $api.post('/storagecrud/update', updateData).then(res => {
            // set(state => {
            //     state.storages.push(res.data)
            // })
        }).catch((error: any) => {
            console.log('склад не обновлён', error)
        })
    },
})))/*, {
    name: "createShopModal",
    version: 1
})*/);

export default useCreateStorageModal;