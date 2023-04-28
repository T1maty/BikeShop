import $api from "shared/http/axios";
import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"

import {Currency} from "../models/Others/Currency";
import {immer} from "zustand/middleware/immer";

interface props {
    allCurrencies: Currency[]
    loadAllCurrencies: () => void
    baseCurrency: Currency | null
    selectedCurrency: Currency | null
    setSelectedCurrency: (id: number) => void
    fromSelectedToBase: { c: number, s: string }
    fromBaseToSelected: { c: number, s: string }
    roundUp: (v: number) => {}
}

export const useCurrency = create<props>()(persist(devtools(immer((set, get) => ({

    fromBaseToSelected: {c: 1, s: ''},
    fromSelectedToBase: {c: 1, s: ''},
    allCurrencies: [],
    baseCurrency: null,
    selectedCurrency: null,
    loadAllCurrencies: () => {
        $api.get<Currency[]>('/currency/getall').then(n => {
            console.log('currenciesLoaded', n.data)
            set(state => {
                state.allCurrencies = n.data
            })
            let bc = n.data.filter(n => n.isBaseCurrency === true)[0]
            set(state => {
                state.baseCurrency = bc
            })
            if (get().selectedCurrency == null)
                get().setSelectedCurrency(bc.id)
        })
    },
    setSelectedCurrency: (id) => {
        let Cur = get().allCurrencies.find(n => n.id === id)
        if (Cur === undefined) console.log('UNDEFINED')
        set(state => {
            state.selectedCurrency = Cur!
            state.fromBaseToSelected = {c: Cur!.coefficient, s: Cur!.symbol}
            state.fromSelectedToBase = {c: 1 / Cur!.coefficient, s: Cur!.symbol}
        })
    },
    roundUp: (v) => {
        return (Math.round(v * 10) / 10).toFixed(2).replace('.00', '')
    }
}))), {
    name: "useCurrency",
    version: 1
}));