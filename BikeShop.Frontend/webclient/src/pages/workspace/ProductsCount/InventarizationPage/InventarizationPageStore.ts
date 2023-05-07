import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {InventarizationFullData} from "./models/InventarizationFullData";
import {CatalogAPI, Inventarization, InventarizationProduct, LocalStorage, ShopAPI} from "../../../../entities";
import {Product} from "entities";
import Enumerable from "linq";

interface InventarizationStore {
    currentInventarization: InventarizationFullData
    setInventariazation: (value: InventarizationFullData) => void
    setProducts: (value: InventarizationProduct[]) => void


    toInvStorage: Product[]
    updateToIv: () => void
    recalculate: () => void
    loadFromStorage: () => void

    selectedM: Product | null,
    setSelectedM: (value: Product) => void
}

export const useInventarization = create<InventarizationStore>()(persist(devtools(immer((set, get) => ({
    currentInventarization: {
        products: [],
        inventarization: {shopId: LocalStorage.shopId()!} as unknown as Inventarization
    },
    recalculate: () => {

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

                    let data = h.data.map(n => {
                        let ent = get().currentInventarization.products.find(s => s.productId === n.id)
                        let quant = t.data.find(h => h.productId === n.id)
                        if (ent != undefined && quant != undefined) return {
                            ...n,
                            quantity: quant.available - ent.quantity
                        }
                        else if (quant != undefined) return {...n, quantity: quant.available}
                        else return {...n, quantity: 0}
                        // @ts-ignore
                    }).filter(k => k.quantity != 0)
                    set({toInvStorage: data})
                })
            })
        })
    },
    selectedM: null,
    setSelectedM: (value) => {
        set({selectedM: value})
    }

}))), {
    name: "InventarizationStore",
    version: 1
}));