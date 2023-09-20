import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ProductCatalogResponse} from "../../../entities/models/ProductCatalogResponse";
import {GetCatalogDataRequest} from "../../../entities/models/GetCatalogDataRequest";
import {ProductCardAPI} from "../../../entities";

interface p {
    isLoading: boolean
    catalogState: ProductCatalogResponse | null
    getCatalogState: () => void
}

const useCardCatalogStore = create<p>()(persist(devtools(immer((set, get) => ({
    catalogState: null,
    isLoading: false,
    getCatalogState: () => {
        let data: GetCatalogDataRequest = {
            categoryId: 2,
            storageId: 1,
            page: 1,
            pageSize: 2000,
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
}))), {
    name: "useCardCatalogStore",
    version: 1
}));

export default useCardCatalogStore;