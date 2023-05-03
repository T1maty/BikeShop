import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogAPI, ProductStorageQuantity} from "../../../entities";

interface i {
    storageData: ProductStorageQuantity[]
    loadStorageData: (id: string) => void
}

export const useProductCatalogStorage = create<i>()(persist(devtools(immer((set, get) => ({
    storageData: [],
    loadStorageData: (id) => {
        CatalogAPI.getStorageProductIds(id).then(n => {
            console.log('loadedStorage', n.data)
            set({storageData: n.data})
        }).catch(e => {
            console.log(e)
        })
    }
}))), {
    name: "useProductCatalogStorage",
    version: 1
}));