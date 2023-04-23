import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {InventarizationFullData} from "./models/InventarizationFullData";
import {Inventarization} from "../../../entities";

interface InventarizationStore {
    currentInventarization: InventarizationFullData
    setInventariazation: (value: InventarizationFullData) => void
}

export const useInventarization = create<InventarizationStore>()(/*persist(*/devtools(immer((set, get) => ({
    currentInventarization: {products: [], inventarization: {} as Inventarization},
    setInventariazation: (value) => {
        set(state => {
            state.currentInventarization = value
        })
    }

})))/*, {
    name: "InventarizationStore",
    version: 1
})*/);