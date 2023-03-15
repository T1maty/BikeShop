import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";

interface CreateQuantityUnitModalStore {
    openQuantityUnitModal: boolean
    setOpenCreateQuantityUnitModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    currentQuantityUnit: any // CreateShopResponse | null
    setCurrentQuantityUnit: (quantityUnit: any) => void
    quantityUnits: any[]
    // getShops: () => void
    // addNewShop: (data: CreateShop) => any
    // updateShopInfo: (updateData: UpdateShop) => any
}

const useCreateQuantityUnitModal = create<CreateQuantityUnitModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openQuantityUnitModal: false,
    setOpenCreateQuantityUnitModal: (value: boolean) => set({openQuantityUnitModal: value}),
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    currentQuantityUnit: null,
    setCurrentQuantityUnit: (quantityUnit) => {set({currentQuantityUnit: quantityUnit})},
    quantityUnits: [],
    // getShops: () => {
    //     return $api.get<CreateShopResponse[]>('/shop/getall').then(res => {
    //         set(state => {
    //             state.shops = res.data
    //             console.log('все магазины', state.shops)
    //         })
    //     }).catch((error: any) => {
    //         console.log('магазины не получены')
    //     })
    // },
    // addNewShop: (data) => {
    //     return $api.post('/shop/create', data).then(res => {
    //         // set(state => {
    //         //     state.shops.push(res.data)
    //         // })
    //     }).catch((error: any) => {
    //         console.log('магазин не создан', error)
    //     })
    // },
    // updateShopInfo: (updateData) => {
    //     return $api.put('/shop/update', updateData).then(res => {
    //         // set(state => {
    //         //     state.shops.push(res.data)
    //         // })
    //     }).catch((error: any) => {
    //         console.log('магазин не обновлён', error)
    //     })
    // },
})))/*, {
    name: "createQuantityUnitModal",
    version: 1
})*/);

export default useCreateQuantityUnitModal;