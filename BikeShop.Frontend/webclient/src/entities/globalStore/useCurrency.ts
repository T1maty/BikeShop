import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {Currency} from "../models/Others/Currency"
import {immer} from "zustand/middleware/immer"
import {EntitiesAPI} from '../api/EntitiesAPI'

interface props {
    fromSelectedToBase: { c: number, s: string }
    fromBaseToSelected: { c: number, s: string }

    baseCurrency: Currency | null
    selectedCurrency: Currency | null
    allCurrencies: Currency[]
    loadAllCurrencies: () => void
    setSelectedCurrency: (id: number) => void
    roundUp: (v: number) => {}
}

export const useCurrency = create<props>()(persist(devtools(immer((set, get) => ({
    fromBaseToSelected: {c: 1, s: ''},
    fromSelectedToBase: {c: 1, s: ''},

    baseCurrency: null,
    selectedCurrency: null,
    allCurrencies: [],
    loadAllCurrencies: () => {
        EntitiesAPI.Currency.getCurrencies().then(n => {
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