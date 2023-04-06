import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogProductItemType, ProductTag, ShopAPI} from '../../../../entities'

interface UseCatalogStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    tags: ProductTag[]
    getTags: () => void
    defaultProducts: CatalogProductItemType[]
    getDefaultProducts: () => void
}

const useCatalog = create<UseCatalogStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    tags: [],
    getTags: () => {
        set({isLoading: true})
        ShopAPI.getTags().then(res => {
            set(state => {
                state.tags = res.data
                console.log('все теги', state.tags)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('теги не получены')
        })
    },
    defaultProducts: [],
    getDefaultProducts: () => {
        set({isLoading: true})
        ShopAPI.getDefaultProducts().then(res => {
            set(state => {
                state.defaultProducts = res.data
                console.log('все дефолтные товары', state.defaultProducts)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('дефолтные товары не получены')
        })
    },
})))/*, {
    name: "useCatalog",
    version: 1
})*/);

export default useCatalog;