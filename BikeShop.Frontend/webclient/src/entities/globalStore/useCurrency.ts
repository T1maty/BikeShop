import $api from "shared/http/axios";
import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {Currency} from "../models/Others/Currency";

interface props {
    allCurrencies: Currency[]
    loadAllCurrencies: () => void
    baseCurrency: Currency | null
    selectedCurrency: Currency | null
    setSelectedCurrency: (id: number) => void
    fromSelectedToBase: (value: number) => { res: number, s: string }
    fromBaseToSelected: (value: number) => { res: number, s: string }
}

export const useCurrency = create<props>()(persist(devtools(immer((set, get) => ({
    allCurrencies: [],
    baseCurrency: null,
    selectedCurrency: null,
    loadAllCurrencies: () => {
        $api.get<Currency[]>('/currency/getall').then(n => {
            console.log('currenciesLoaded', n.data)
            set(state => {
                state.allCurrencies = n.data
            })
            set(state => {
                state.baseCurrency = n.data.filter(n => n.isBaseCurrency === true)[0]
            })
            set(state => {
                state.selectedCurrency = state.baseCurrency
            })
        })
    },
    setSelectedCurrency: (id) => {
        let Cur = get().allCurrencies.find(n => n.id === id)
        set(state => {
            state.selectedCurrency = Cur!
        })
    },
    fromSelectedToBase: (value) => {
        return {res: value / get().selectedCurrency?.coefficient!, s: get().selectedCurrency?.symbol!}
    },
    fromBaseToSelected: (value) => {
        return {res: value * get().selectedCurrency?.coefficient!, s: get().selectedCurrency?.symbol!}
    }
}))), {
    name: "useCurrency",
    version: 1
}));