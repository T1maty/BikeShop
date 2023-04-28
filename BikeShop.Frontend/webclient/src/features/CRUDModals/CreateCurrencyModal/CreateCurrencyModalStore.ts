import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {Currency, EntitiesAPI} from "../../../entities"

interface CreateCurrencyModalStore {
    openCurrencyModal: boolean
    setOpenCreateCurrencyModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    currentCurrency: Currency | null
    setCurrentCurrency: (currency: Currency | null) => void

    currencies: Currency[]
    getCurrencies: () => void
    addCurrency: (data: Currency) => any
    updateCurrency: (updateData: Currency) => any
}

const useCreateCurrencyModal = create<CreateCurrencyModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openCurrencyModal: false,
    setOpenCreateCurrencyModal: (value: boolean) =>
        set({openCurrencyModal: value}),
    isLoading: false,
    errorStatus: 'default',

    currentCurrency: null,
    setCurrentCurrency: (currency) => {
        set({currentCurrency: currency})
    },

    currencies: [],
    getCurrencies: () => {
        set({isLoading: true})
        EntitiesAPI.Currency.getCurrencies().then(res => {
            set(state => {
                state.currencies = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    addCurrency: (data) => {
        set({isLoading: true})
        EntitiesAPI.Currency.createCurrency(data).then((res: any) => {
            set(state => {
                state.currencies.push(res.data)
            })

            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    updateCurrency: (updateData) => {
        set({isLoading: true})
        EntitiesAPI.Currency.updateCurrency(updateData).then((res: any) => {
            EntitiesAPI.Currency.getCurrencies().then(res => {
                set(state => {
                    state.currencies = res.data
                    state.currentCurrency = null
                })
            })
            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "createCurrencyModal",
    version: 1
})*/);

export default useCreateCurrencyModal;