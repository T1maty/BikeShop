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
    addProduct: (v: Product) => void
    addedHistory: Product[]
    addProductToHistory: (v: Product) => void

    toInvStart: Product[]
    toInvStorage: Product[]
    updateToIv: () => void
    recalculate: () => void
    loadFromStorage: () => void

    selectedM: Product | null,
    setSelectedM: (value: Product | undefined) => void

    selectedS: InventarizationProduct | null,
    setSelectedS: (v: InventarizationProduct | null) => void
}

export const useInventarization = create<InventarizationStore>()(persist(devtools(immer((set, get) => ({
    selectedS: null,
    setSelectedS: (v) => {
        set({selectedS: v})
    },
    addProduct: (p) => {
        get().addProductToHistory(p)
        let products = get().currentInventarization.products
        let ent = products.find(n => n.productId === p.id)
        if (ent != undefined) {
            let added: InventarizationProduct | null = null
            get().setProducts(products.map(n => {
                if (n.productId === p.id) {
                    let nq = parseFloat(n.quantity.toString()) + 1
                    added = {
                        ...n,
                        quantity: nq,
                        dealerTotal: nq * n.dealerPrice,
                        retailTotal: nq * n.retailPrice,
                        incomeTotal: nq * n.incomePrice
                    }
                    return added
                }
                return n
            }));
            get().setSelectedS(added)
        } else {
            let n = {
                id: 0,
                createdAt: Date.now().toLocaleString(),
                updatedAt: Date.now().toLocaleString(),
                enabled: true,
                inventariazationId: get().currentInventarization.inventarization.id,
                productId: p.id,
                name: p.name,
                description: '',
                catalogKey: p.catalogKey,
                barcode: p.barcode,
                manufBarcode: p.manufacturerBarcode != null ? p.manufacturerBarcode : '',
                quantityUnitName: p.quantityUnitName,
                incomePrice: p.incomePrice,
                dealerPrice: p.dealerPrice,
                retailPrice: p.retailPrice,
                quantity: 1,
                incomeTotal: p.incomePrice,
                dealerTotal: p.dealerPrice,
                retailTotal: p.retailPrice,
                userCreated: LocalStorage.userId()!,
                userUpdated: LocalStorage.userId()!
            } as InventarizationProduct
            get().setProducts([...products, n])
            get().setSelectedS(n)
        }
    },
    addedHistory: [],
    addProductToHistory: (v) => {
        set(state => {
            state.addedHistory.push(v)
        })
    },
    currentInventarization: {
        products: [],
        inventarization: {shopId: LocalStorage.shopId()!} as unknown as Inventarization
    },
    recalculate: () => {
        let data = get().toInvStart.map(n => {
            let ent = get().currentInventarization.products.find(s => s.productId === n.id)

            if (ent != undefined) {
                // @ts-ignore
                return {...n, quantity: n.quantity - ent.quantity} as Product
            } else return n as Product
            // @ts-ignore
        }).filter(k => k.quantity != 0)

        let additional = get().currentInventarization.products.map(n => {
            let ent = data.find(j => j.id === n.productId)
            // @ts-ignore
            if (ent === null && get().toInvStart.find(h => h.id === n.productId).quantity - n.quantity != 0) return {
                ...n,
                // @ts-ignore
                quantity: get().toInvStart.find(h => h.id === n.productId)!.quantity - n.quantity
            } as Product
        })

        additional.forEach(k => {
            if (k != undefined) data.push(k)
        })

        set({toInvStorage: data})
    },
    setInventariazation: (value) => {
        set(state => {
            state.currentInventarization = value
        })
    },
    setProducts: (value) => {
        set(state => {
            state.currentInventarization.products = value.filter(n => n.quantity > 0)
        })
        get().recalculate();
    },
    toInvStorage: [],
    toInvStart: [],
    loadFromStorage: () => {

    },
    updateToIv: () => {
        ShopAPI.getStorageId(get().currentInventarization.inventarization.shopId).then(r => {
            CatalogAPI.getStorageProductIds(r.data.toString()).then(t => {
                console.log('Айдишники', t.data)
                CatalogAPI.getProductsByIds(Enumerable.from(t.data).select(m => m.productId).toArray()).then(h => {
                    console.log('Товары на инвентуру', h.data)

                    let data = h.data.map(n => {
                        let quant = t.data.find(h => h.productId === n.id)
                        return {...n, quantity: quant != undefined ? quant.available : 0}
                    }).filter(k => k.quantity != 0)
                    set({toInvStart: data})
                    get().recalculate();
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