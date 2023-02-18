import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateShop, CreateShopSubmit} from '../../entities/requests/CreateShop';

interface CreateShopModalStore {
    createShopModal: boolean
    setCreateShopModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    name: string
    address: string
    phone: string
    storageId: number | null
    // isShopWorking: boolean
    setName: (value: string) => void
    setAddress: (value: string) => void
    setPhone: (value: string) => void
    setStorageId: (value: number | null) => void
    // setIsShopWorking: (value: boolean) => void
    addNewShop: (data: CreateShopSubmit) => Promise<AxiosResponse<CreateShopSubmit>>
}

const useCreateShopModal = create<CreateShopModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    createShopModal: true,
    setCreateShopModal: (value: boolean) => set({
        createShopModal: value
    }),
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),

    name: '',
    address: '',
    phone: '',
    storageId: 0,
    // isShopWorking: true,

    setName: (value: string) => set({
        name: value
    }),
    setAddress: (value: string) => set({
        address: value
    }),
    setPhone: (value: string) => set({
        phone: value
    }),
    setStorageId: (value: number | null) => set({
        storageId: value
    }),
    // setIsShopWorking: (value: boolean) => set({
    //     isShopWorking: value
    // }),

    addNewShop: (data) => {
        return $api.post<CreateShopSubmit>('/shop/create', data)
    },
})))/*, {
    name: "createShopModal",
    version: 1
})*/);

export default useCreateShopModal;