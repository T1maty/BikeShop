import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ProductFiltersDTO} from "../../../../entities/DataTransferObjects/responses/ProductFiltersDTO";
import {EntitiesAPI} from "../../../../entities";
import {ProductFilterVariantDTO} from "../../../../entities/DataTransferObjects/responses/ProductFilterVariantDTO";

interface p {
    isLoading: boolean
    filters: ProductFiltersDTO[]
    selectedFilters: ProductFilterVariantDTO[]
    addSelectedFilter: (filter: ProductFilterVariantDTO) => void
    removeSelectedFilter: (filter: ProductFilterVariantDTO) => void
    clearSelectedFilters: () => void
    getFilters: (productIds: number[]) => void
}

const useProductCatalogFiltersStore = create<p>()(persist(devtools(immer((set, get) => ({
    selectedFilters: [],
    isLoading: false,
    filters: [],
    clearSelectedFilters: () => {
        set({selectedFilters: []})
    },
    addSelectedFilter: (filter) => {
        if (get().selectedFilters.filter(n => n.variantName === filter.variantName).length === 0
        ) {
            set(state => {
                state.selectedFilters.push(filter)
            })
        }

    },
    removeSelectedFilter: (filter) => {
        set({
            selectedFilters: get().selectedFilters.filter(n => n != filter)
        })
    },
    getFilters: (productIds) => {
        set({isLoading: true})
        EntitiesAPI.Filters.getFiltersByProducts(productIds).then(r => {
            set({filters: r.data})
            let variants: ProductFilterVariantDTO[] = []

            r.data.forEach(n => {
                variants = variants.concat(n.variants)
            })

            let d: ProductFilterVariantDTO[] = []
            get().selectedFilters.forEach(n => {
                if (variants.find(g => g.variantName === n.variantName) != undefined) d.push(variants.find(g => g.variantName === n.variantName)!)
            })
            set({selectedFilters: d})
        }).finally(() => {
            set({isLoading: false})
        })
    }
}))), {
    name: "useProductCatalogFiltersStore",
    version: 1
}));

export default useProductCatalogFiltersStore;