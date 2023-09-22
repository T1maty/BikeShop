import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ProductCatalogResponse} from "../../../entities/models/ProductCatalogResponse";
import {GetCatalogDataRequest} from "../../../entities/models/GetCatalogDataRequest";
import {EntitiesAPI, ProductCardAPI, ProductFullData, useAuth} from "../../../entities";
import {CreateStorageResponse} from "../../../entities/DataTransferObjects/responses/StorageResponse";
import {SingleValue} from "react-select";

interface p {
    isLoading: boolean
    catalogState: ProductCatalogResponse | null
    getCatalogState: (categoryId: number) => void

    storages: CreateStorageResponse[]
    getStorages: () => void
    selectedStorage: CreateStorageResponse | null
    setSelectedStorage: (storageId: number) => void
    updateItem: (p: ProductFullData) => void

    sortMode: { name: string } | null
    setSortMode: (v: SingleValue<{ name: string }>) => void
}

const useCardCatalogStore = create<p>()(persist(devtools(immer((set, get) => ({
    sortMode: null,
    setSortMode: (v) => set({sortMode: v}),
    updateItem: (p) => {
        let nd = get().catalogState?.products.map(n => {
            if (n.product.id == p.product.id) return p
            return n
        })
        let fids = p.bindedProducts.map(n => n.id).filter(n => n != p.product.id)
        nd = nd!.filter(n => !fids.includes(n.product.id))
        set({catalogState: {...get().catalogState!, products: nd!}})
    },
    catalogState: null,
    isLoading: false,
    getCatalogState: (categoryId) => {
        let data: GetCatalogDataRequest = {
            categoryId: categoryId,
            storageId: get().selectedStorage!.id,
            page: 1,
            pageSize: 20,
            filtersVariantIds: [],
            sortingSettings: []
        }
        let ss = get().sortMode
        if (ss != null) data.sortingSettings = [ss.name]

        set({isLoading: true})
        ProductCardAPI.getByCategory(data).then(r => {
            console.log(r.data)
            set({catalogState: r.data})
        }).finally(() => {
            set({isLoading: false})
        })
    },
    storages: [],
    getStorages: () => {
        set({isLoading: true})
        EntitiesAPI.Storage.getStorages().then(res => {
            set(state => {
                state.storages = res.data
            })

            // для дефолтного значения склада
            let currentShop = useAuth.getState().shop
            let defaultShopStorage = get().storages.find(st => st.id === currentShop?.storageId)
            set(state => {
                state.selectedStorage = defaultShopStorage!
            })

            set({isLoading: false})
        }).finally(() => {
            set({isLoading: false})
        })
    },
    selectedStorage: null,
    setSelectedStorage: (storageId) => {
        let storage = get().storages.find(st => st.id === storageId)

        if (storage === undefined) console.log('storage UNDEFINED')
        set(state => {
            state.selectedStorage = storage!
        })
    },
}))), {
    name: "useCardCatalogStore",
    version: 1
}));

export default useCardCatalogStore;