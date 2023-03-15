import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";

interface CreateCurrencyModalStore {
    openCurrencyModal: boolean
    setOpenCreateCurrencyModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    currentCurrency: any // CreateShopResponse | null
    setCurrentCurrency: (currency: any) => void
    currencies: any[]
    // getShops: () => void
    // addNewShop: (data: CreateShop) => any
    // updateShopInfo: (updateData: UpdateShop) => any
}

const useCreateCurrencyModal = create<CreateCurrencyModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openCurrencyModal: false,
    setOpenCreateCurrencyModal: (value: boolean) => set({openCurrencyModal: value}),
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    currentCurrency: null,
    setCurrentCurrency: (currency) => {set({currentCurrency: currency})},
    currencies: [],
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
    name: "createCurrencyModal",
    version: 1
})*/);

export default useCreateCurrencyModal;