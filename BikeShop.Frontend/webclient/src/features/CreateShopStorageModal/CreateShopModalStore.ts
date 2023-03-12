import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateShop, UpdateShop} from '../../entities';
import {CreateShopResponse} from "../../entities/responses/ShopResponse";

interface CreateShopModalStore {
    createShopModal: boolean
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
    createShopModal: false,
    setOpenCreateShopModal: (value: boolean) => set({createShopModal: value}),
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    currentShop: null,
    setCurrentShop: (shop) => {set({currentShop: shop})},
    shops: [],
    getShops: () => {
        return $api.get<CreateShopResponse[]>('/shop/getall').then(res => {
            set(state => {
                state.shops = res.data
                console.log('все магазины', state.shops)
            })
        }).catch((error: any) => {
            console.log('магазины не получены')
        })
    },
    addNewShop: (data) => {
        return $api.post('/shop/create', data).then(res => {
            // set(state => {
            //     state.shops.push(res.data)
            // })
        }).catch((error: any) => {
            console.log('магазин не создан', error)
        })
    },
    updateShopInfo: (updateData) => {
        return $api.put('/shop/update', updateData).then(res => {
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