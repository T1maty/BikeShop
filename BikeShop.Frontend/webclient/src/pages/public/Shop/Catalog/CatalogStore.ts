import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogProductItemType, ProductTag, ShopAPI} from '../../../../entities'
import {ErrorStatusTypes} from '../../../../entities/enumerables/ErrorStatusTypes'

interface UseCatalogStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    errorStatus: ErrorStatusTypes
    // isDivDisabled: boolean
    // setIsDivDisabled: (value: boolean) => void

    tags: ProductTag[]
    getTags: () => void

    defaultProducts: CatalogProductItemType[]
    getDefaultProducts: () => void

    currentProduct: CatalogProductItemType | null
    setCurrentProduct: (product: CatalogProductItemType | null) => void
}

const useCatalog = create<UseCatalogStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),
    errorStatus: 'default',
    // isDivDisabled: false,
    // setIsDivDisabled: (value) => set({isDivDisabled: value}),

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
            set({isLoading: false})
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
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    currentProduct: {} as CatalogProductItemType,
    setCurrentProduct: (product) => {
        set({currentProduct: product})
    },
})))/*, {
    name: "useCatalog",
    version: 1
})*/);

export default useCatalog;