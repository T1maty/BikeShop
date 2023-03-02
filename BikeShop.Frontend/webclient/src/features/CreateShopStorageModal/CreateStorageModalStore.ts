import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateShop} from '../../entities/requests/CreateShop';

interface CreateStorageModalStore {
    createStorageModal: boolean
    setCreateStorageModal: (value: boolean) => void
    storageName: string
    storageWaiting: string
    setStorageName: (value: string) => void
    setStorageWaiting: (value: string) => void
    addNewStorage: () => any
}

const useCreateStorageModal = create<CreateStorageModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    createStorageModal: true,
    setCreateStorageModal: (value: boolean) => set({
        createStorageModal: value
    }),

    storageName: '',
    storageWaiting: '',
    setStorageName: (value: string) => set({
        storageName: value
    }),
    setStorageWaiting: (value: string) => set({
        storageWaiting: value
    }),

    addNewStorage: () => {
        // set({isLoading: true});
        // return $api.get('/user/find', data).then(res => {
        //     set(state => {
        //         state.users = [...res.data.users]
        //     })
        //     set({isLoading: false});
        // })
    },
})))/*, {
    name: "createShopModal",
    version: 1
})*/);

export default useCreateStorageModal;