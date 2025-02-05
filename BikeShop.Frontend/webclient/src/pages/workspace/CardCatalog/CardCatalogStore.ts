import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ProductCatalogResponse} from "../../../entities/models/ProductCatalogResponse";
import {GetCatalogDataRequest} from "../../../entities/models/GetCatalogDataRequest";
import {EntitiesAPI, ProductCardAPI, ProductFullData, useAuth} from "../../../entities";
import {CreateStorageResponse} from "../../../entities/DataTransferObjects/responses/StorageResponse";
import {SingleValue} from "react-select";
import {GetCatalogDataSearchRequest} from "../../../entities/models/GetCatalogDataSearchRequest";

interface p {
    isLoading: boolean
    catalogState: ProductCatalogResponse | null
    setCatalogState: (v: ProductCatalogResponse | null) => void
    getCatalogState: () => void
    getCatalogStateSearch: (querry: string) => void

    selectedOptions: number[]
    setSelectedOptions: (v: number[]) => void
    storages: CreateStorageResponse[]
    getStorages: () => void
    selectedStorage: CreateStorageResponse | null
    setSelectedStorage: (storageId: number) => void
    updateItem: (p: ProductFullData) => void

    sortMode: { name: string, label: string } | null
    setSortMode: (v: SingleValue<{ name: string, label: string }>) => void

    selectedPage: number
    setSelectedPage: (v: number) => void

    lastCategoryId: number | null
    setLastCategoryId: (v: number) => void
}

const useCardCatalogStore = create<p>()(persist(devtools(immer((set, get) => ({
    selectedOptions: [],
    setSelectedOptions: (v) => {
        set({selectedOptions: v})
        get().getCatalogState()
    },
    setCatalogState: (v) => set({catalogState: v}),
    lastCategoryId: null,
    setLastCategoryId: (v) => set({lastCategoryId: v}),
    selectedPage: 1,
    setSelectedPage: (v) => {
        set({selectedPage: v})
        get().getCatalogState()
    },
    sortMode: null,
    setSortMode: (v) => {
        set({sortMode: v})
        get().getCatalogState()
    },
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
    getCatalogStateSearch: (querry) => {
        if (get().lastCategoryId === null) return
        let data: GetCatalogDataSearchRequest = {
            querry: querry,
            storageId: get().selectedStorage!.id,
            page: get().selectedPage,
            pageSize: 20,
            filtersVariantIds: [],
            sortingSettings: []
        }
        let ss = get().sortMode
        if (ss != null) data.sortingSettings = [ss.name]
        set({isLoading: true})
        ProductCardAPI.search(data).then(r => {
            console.log(r.data)
            set({catalogState: r.data})
        }).finally(() => {
            set({isLoading: false})
        })
    },
    getCatalogState: () => {
        if (get().lastCategoryId === null) return
        let data: GetCatalogDataRequest = {
            categoryId: get().lastCategoryId!,
            storageId: get().selectedStorage!.id,
            page: get().selectedPage,
            pageSize: 20,
            filtersVariantIds: get().selectedOptions,
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