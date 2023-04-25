import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ProductCardAPI, ProductFullData, ProductTag, ShopAPI} from '../../../../entities'
import {ErrorStatusTypes} from '../../../../entities/enumerables/ErrorStatusTypes'

interface UseCatalogStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    errorStatus: ErrorStatusTypes

    tags: ProductTag[]
    getTags: () => void
    userCurrentTags: ProductTag[]
    setUserCurrentTag: (tag: ProductTag) => void
    deleteUserCurrentTag: (filteredTags: ProductTag[]) => void

    defaultProducts: ProductFullData[]
    getDefaultProducts: () => void

    currentProduct: ProductFullData | null
    setCurrentProduct: (product: ProductFullData | null) => void
    getCurrentProduct: (productId: number) => void
}

const useCatalog = create<UseCatalogStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),
    errorStatus: 'default',

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
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            // set({isLoading: false})
        })
    },
    userCurrentTags: [],
    setUserCurrentTag: (tag) => set(state => {
        state.userCurrentTags.push(tag)
    }),
    deleteUserCurrentTag: (filteredTags) => set(state => {
        state.userCurrentTags = filteredTags
    }),

    defaultProducts: [],
    getDefaultProducts: () => {
        set({isLoading: true})
        ShopAPI.getDefaultProducts().then(res => {
            set(state => {
                state.defaultProducts = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            // set({isLoading: false})
        })
    },

    currentProduct: {} as ProductFullData,
    setCurrentProduct: (product) => {
        set({currentProduct: product})
    },
    getCurrentProduct: (productId: number) => {
        set({isLoading: true})
        ProductCardAPI.getProductCardById(productId).then(res => {
            set(state => {
                state.currentProduct = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({isLoading: false})
            set({errorStatus: 'default'})
        })
    },
})))/*, {
    name: "useCatalog",
    version: 1
})*/);

export default useCatalog;