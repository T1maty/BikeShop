import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateShopSubmit} from '../../entities';

interface CreateShopModalStore {
    createShopModal: boolean
    setCreateShopModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    // name: string
    // setName: (value: string) => void
    // address: string
    // setAddress: (value: string) => void
    // phone: string
    // setPhone: (value: string) => void
    // storageId: number | null
    // setStorageId: (value: number | null) => void
    // isShopWorking: boolean
    // setIsShopWorking: (value: boolean) => void
    addNewShop: (data: CreateShopSubmit) => any
    // updateShopInfo: (data: CreateShopSubmit) => any
}

const useCreateShopModal = create<CreateShopModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    createShopModal: true,
    setCreateShopModal: (value: boolean) => set({createShopModal: value}),
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    // name: '',
    // setName: (value: string) => set({name: value}),
    // address: '',
    // setAddress: (value: string) => set({address: value}),
    // phone: '',
    // setPhone: (value: string) => set({phone: value}),
    // storageId: 0,
    // setStorageId: (value: number | null) => set({storageId: value}),
    // isShopWorking: true,
    // setIsShopWorking: (value: boolean) => set({isShopWorking: value}),

    addNewShop: (data) => {
        return $api.post<CreateShopSubmit>('/shop/create', data).then(res => {
            // code
        }).catch((error: any) => {
            console.log('магазин не создан')
        })
    },
    // updateShopInfo: (data) => {
    //     return $api.post<CreateShopSubmit>('/shop/create', data)
    // },
})))/*, {
    name: "createShopModal",
    version: 1
})*/);

export default useCreateShopModal;