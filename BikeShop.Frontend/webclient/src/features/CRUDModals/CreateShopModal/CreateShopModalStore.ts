import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CreateShop, EntitiesAPI, UpdateShop} from '../../../entities'
import {CreateShopResponse} from "../../../entities/responses/ShopResponse"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"

interface CreateShopModalStore {
    openCreateShopModal: boolean
    setOpenCreateShopModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    currentShop: CreateShopResponse | null
    setCurrentShop: (shop: CreateShopResponse | null) => void
    shops: CreateShopResponse[]
    getShops: () => void
    addNewShop: (data: CreateShop) => any
    updateShopInfo: (updateData: UpdateShop) => any
}

const useCreateShopModal = create<CreateShopModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openCreateShopModal: false,
    setOpenCreateShopModal: (value: boolean) => set({openCreateShopModal: value}),
    isLoading: false,
    errorStatus: 'default',

    currentShop: null,
    setCurrentShop: (shop) => {
        set({currentShop: shop})
    },
    shops: [],
    getShops: () => {
        set({isLoading: true})
        EntitiesAPI.Shop.getShops().then(res => {
            set(state => {
                state.shops = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    addNewShop: (data) => {
        set({isLoading: true})
        EntitiesAPI.Shop.addNewShop(data).then((res: any) => {
            set(state => {
                state.shops.push(res.data)
            })
            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
            console.log(error)
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    updateShopInfo: (updateData) => {
        set({isLoading: true})
        EntitiesAPI.Shop.updateShopInfo(updateData).then((res: any) => {
            EntitiesAPI.Shop.getShops().then(res => {
                set(state => {
                    state.shops = res.data
                    state.currentShop = null
                })
            })
            set({isLoading: false})
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

export default useCreateShopModal;