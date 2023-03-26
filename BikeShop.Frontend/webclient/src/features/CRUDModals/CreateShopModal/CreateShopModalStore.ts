import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../shared"
import {AxiosResponse} from "axios"
import {CreateShop, UpdateShop} from '../../../entities'
import {CreateShopResponse} from "../../../entities/responses/ShopResponse"
import {EntitiesAPI} from "../../../entities/api/EntitiesAPI"

interface CreateShopModalStore {
    openCreateShopModal: boolean
    setOpenCreateShopModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

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
    setIsLoading: (value: boolean) => set({isLoading: value}),

    currentShop: null,
    setCurrentShop: (shop) => {
        set({currentShop: shop})
    },
    shops: [],
    getShops: () => {
        EntitiesAPI.Shop.getShops().then(res => {
            set(state => {
                state.shops = res.data
                console.log('все магазины', state.shops)
            })
        }).catch((error: any) => {
            console.log('магазины не получены')
        })
    },
    addNewShop: (data) => {
        EntitiesAPI.Shop.addNewShop(data).then((res: any) => {
            // set(state => {
            //     state.shops.push(res.data)
            // })
        }).catch((error: any) => {
            console.log('магазин не создан', error)
        })
    },
    updateShopInfo: (updateData) => {
        EntitiesAPI.Shop.updateShopInfo(updateData).then((res: any) => {
            // set(state => {
            //     state.shops.push(res.data)
            // })
        }).catch((error: any) => {
            console.log('магазин не обновлён', error)
        })
    },
})))/*, {
    name: "createShopModal",
    version: 1
})*/);

export default useCreateShopModal;