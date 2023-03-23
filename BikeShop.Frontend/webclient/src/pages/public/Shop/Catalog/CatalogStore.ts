import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../../shared"
import {AxiosResponse} from "axios"
import ProductTag from "../../../../entities/models/ProductTag"
import {CatalogProductItem} from "../../../../entities/models/CatalogProductItem"

interface UseCatalogStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    tags: ProductTag[]
    getTags: () => void
    defaultProducts: CatalogProductItem[]
    getDefaultProducts: () => void
}

const useCatalog = create<UseCatalogStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    tags: [],
    getTags: () => {
        return $api.get<ProductTag[]>('/public/gettags').then(res => {
            set(state => {
                state.tags = res.data
                console.log('все теги', state.tags)
            })
        }).catch((error: any) => {
            console.log('теги не получены')
        })
    },
    defaultProducts: [],
    getDefaultProducts: () => {
        return $api.get<CatalogProductItem[]>('/public/gettags').then(res => {
            set(state => {
                state.defaultProducts = res.data
                console.log('все дефолтные товары', state.defaultProducts)
            })
        }).catch((error: any) => {
            console.log('дефолтные товары не получены')
        })
    },
})))/*, {
    name: "useCatalog",
    version: 1
})*/);

export default useCatalog;