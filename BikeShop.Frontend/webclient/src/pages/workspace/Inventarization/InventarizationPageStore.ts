import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {InventarizationFullData} from "./models/InventarizationFullData";
import {CatalogAPI, Inventarization, InventarizationProduct, LocalStorage, ShopAPI} from "../../../entities";
import {Product} from "entities";
import Enumerable from "linq";

interface InventarizationStore {
    currentInventarization: InventarizationFullData
    setInventariazation: (value: InventarizationFullData) => void
    setProducts: (value: InventarizationProduct[]) => void


    toInvStorage: Product[]
    updateToIv: () => void
    loadFromStorage: () => void
}

export const useInventarization = create<InventarizationStore>()(/*persist(*/devtools(immer((set, get) => ({
    currentInventarization: {
        products: [],
        inventarization: {shopId: LocalStorage.shopId()!} as unknown as Inventarization
    },
    setInventariazation: (value) => {
        set(state => {
            state.currentInventarization = value
        })
    },
    setProducts: (value) => {
        set(state => {
            state.currentInventarization.products = value
        })
    },
    toInvStorage: [],
    loadFromStorage: () => {

    },
    updateToIv: () => {
        ShopAPI.getStorageId(get().currentInventarization.inventarization.shopId).then(r => {
            CatalogAPI.getStorageProductIds(r.data.toString()).then(t => {
                console.log('Айдишники', t.data)
                CatalogAPI.getProductsByIds(Enumerable.from(t.data).select(m => m.productId).toArray()).then(h => {
                    console.log('Товары на инвентуру', h.data)
                    set({toInvStorage: h.data})
                })
            })
        })
    }

})))/*, {
    name: "InventarizationStore",
    version: 1
})*/);