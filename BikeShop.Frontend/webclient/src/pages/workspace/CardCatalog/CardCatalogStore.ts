import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ProductCatalogResponse} from "../../../entities/models/ProductCatalogResponse";
import {GetCatalogDataRequest} from "../../../entities/models/GetCatalogDataRequest";
import {EntitiesAPI, ProductCardAPI, useAuth} from "../../../entities";
import {CreateStorageResponse} from "../../../entities/DataTransferObjects/responses/StorageResponse";

interface p {
    isLoading: boolean
    catalogState: ProductCatalogResponse | null
    getCatalogState: () => void

    storages: CreateStorageResponse[]
    getStorages: () => void
    selectedStorage: CreateStorageResponse | null
    setSelectedStorage: (storageId: number) => void
}

const useCardCatalogStore = create<p>()(persist(devtools(immer((set, get) => ({
    catalogState: null,
    isLoading: false,
    getCatalogState: () => {
        let data: GetCatalogDataRequest = {
            categoryId: 2,
            storageId: 1,
            page: 1,
            pageSize: 20,
            filtersVariantIds: [],
            sortingSettings: []
        }

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