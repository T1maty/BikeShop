import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateShop} from '../../entities/requests/CreateShop';

interface CreateStoreModalStore {
    createStoreModal: boolean
    setCreateStoreModal: (value: boolean) => void
    storeName: string
    storeWaiting: string
    setStoreName: (value: string) => void
    setStoreWaiting: (value: string) => void
    addNewStore: () => any
}

const useCreateStoreModal = create<CreateStoreModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    createStoreModal: true,
    setCreateStoreModal: (value: boolean) => set({
        createStoreModal: value
    }),

    storeName: '',
    storeWaiting: '',
    setStoreName: (value: string) => set({
        storeName: value
    }),
    setStoreWaiting: (value: string) => set({
        storeWaiting: value
    }),

    addNewStore: () => {
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

export default useCreateStoreModal;