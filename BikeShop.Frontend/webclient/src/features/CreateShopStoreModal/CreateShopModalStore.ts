import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateShop} from '../../entities/requests/CreateShop';

interface CreateShopModalStore {
    createShopModal: boolean
    setCreateShopModal: (value: boolean) => void
    shopName: string
    shopAddress: string
    shopPhoneNumber: string
    shopStock: string
    isShopWorking: boolean
    setShopName: (value: string) => void
    setShopAddress: (value: string) => void
    setShopPhoneNumber: (value: string) => void
    setShopStock: (value: string) => void
    setIsShopWorking: (value: boolean) => void
    addNewShop: () => any
}

const useCreateShopModal = create<CreateShopModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    createShopModal: true,
    setCreateShopModal: (value: boolean) => set({
        createShopModal: value
    }),

    shopName: '',
    shopAddress: '',
    shopPhoneNumber: '',
    shopStock: '',
    isShopWorking: true,

    setShopName: (value: string) => set({
        shopName: value
    }),
    setShopAddress: (value: string) => set({
        shopAddress: value
    }),
    setShopPhoneNumber: (value: string) => set({
        shopPhoneNumber: value
    }),
    setShopStock: (value: string) => set({
        shopStock: value
    }),
    setIsShopWorking: (value: boolean) => set({
        isShopWorking: value
    }),

    addNewShop: () => {
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

export default useCreateShopModal;