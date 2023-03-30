import {EntitiesAPI} from "entities/api/EntitiesAPI"
import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"

interface CreateCurrencyModalStore {
    openCurrencyModal: boolean
    setOpenCreateCurrencyModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    currentCurrency: any // CreateShopResponse | null
    setCurrentCurrency: (currency: any) => void

    currencies: any[]
    // getСurrencies: () => void
    // addCurrency: (data: CreateShop) => any
    // updateCurrency: (updateData: UpdateShop) => any
}

const useCreateCurrencyModal = create<CreateCurrencyModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openCurrencyModal: false,
    setOpenCreateCurrencyModal: (value: boolean) => set({openCurrencyModal: value}),
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    currentCurrency: null,
    setCurrentCurrency: (currency) => {
        set({currentCurrency: currency})
    },

    currencies: [],
    // getСurrencies: () => {
    //     set({isLoading: true})
    //     EntitiesAPI.QuantityUnit.getQuantityUnits().then(res => {
    //         set(state => {
    //             state.quantityUnits = res.data
    //             console.log('все ед.измерения', state.quantityUnits)
    //         })
    //         set({isLoading: false})
    //     }).catch((error: any) => {
    //         console.log('ед.измерения не получены')
    //     })
    // },
    // addCurrency: (data) => {
    //     set({isLoading: true})
    //     EntitiesAPI.QuantityUnit.addQuantityUnit(data).then((res: any) => {
    //         set(state => {
    //             state.quantityUnits.push(res.data)
    //         })
    //         set({isLoading: false})
    //     }).catch((error: any) => {
    //         console.log('ед.измерения не создана', error)
    //     })
    // },
    // updateCurrency: (updateData) => {
    //     set({isLoading: true})
    //     EntitiesAPI.QuantityUnit.updateQuantityUnit(updateData).then((res: any) => {
    //         //
    //         set({isLoading: false})
    //     }).catch((error: any) => {
    //         console.log('ед.измерения не обновлена', error)
    //     })
    // },
})))/*, {
    name: "createCurrencyModal",
    version: 1
})*/);

export default useCreateCurrencyModal;