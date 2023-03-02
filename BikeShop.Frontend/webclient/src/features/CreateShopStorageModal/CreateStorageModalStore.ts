import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";

interface CreateStorageModalStore {
    createStorageModal: boolean
    setCreateStorageModal: (value: boolean) => void

    storageName: string
    setStorageName: (value: string) => void
    storageWaiting: string
    setStorageWaiting: (value: string) => void

    addNewStorage: (data: any) => any
}

const useCreateStorageModal = create<CreateStorageModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    createStorageModal: true,
    setCreateStorageModal: (value: boolean) => set({createStorageModal: value}),

    storageName: '',
    setStorageName: (value: string) => set({storageName: value}),
    storageWaiting: '',
    setStorageWaiting: (value: string) => set({storageWaiting: value}),

    addNewStorage: (data: any) => {
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