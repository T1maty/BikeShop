import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {
    ProductCardAPI,
    CatalogProductItem,
    ProductOption,
    ProductSpecification,
    UpdateProductCard
} from '../../../entities'

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    isError: boolean
    setIsError: (value: boolean) => void

    currentProduct: CatalogProductItem
    getProductCard: (productId: number) => void
    updateProductCard: (data: UpdateProductCard) => void

    productStatus: string

    cardOptions: ProductOption[]
    currentCardOptions: ProductOption[]
    getCardOptions: () => void

    specifications: ProductSpecification[]
    getSpecifications: () => void
}

const useEditProductCardModal = create<EditProductCardModalStore>()(/*persist(*/devtools(immer((set) => ({
    openEditProductCardModal: false,
    setOpenEditProductCardModal: (value) => set({openEditProductCardModal: value}),
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),
    isError: false,
    setIsError: (value) => set({isError: value}),

    currentProduct: {} as CatalogProductItem,
    getProductCard: (productId: number) => {
        set({isLoading: true})
        ProductCardAPI.getProductCardById(productId).then(res => {
            set(state => {
                state.currentProduct = res.data
                state.productStatus = res.data.product.checkStatus
                console.log('карточка из таблицы', state.currentProduct)
            })
            set({isLoading: false})
            set({openEditProductCardModal: true})
        }).catch((error: any) => {
            set({isError: true})
            console.log('карточка не получена')
        }).finally(() => {
            set({isLoading: false})
            set({isError: false})
        })
    },
    updateProductCard: (data) => {
        set({isLoading: true})
        ProductCardAPI.updateProductCard(data).then((res: any) => {
            set({isLoading: false})
            console.log('карточка обновлена')
        }).catch((error: any) => {
            console.log('карточка не обновлена')
        })
    },

    productStatus: '',

    cardOptions: [],
    currentCardOptions: [],
    getCardOptions: () => {
        set({isLoading: true})
        ProductCardAPI.getOptions().then(res => {
            set(state => {
                state.cardOptions = res.data
                console.log('все доступные опции', state.cardOptions)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('опции не получены')
        })
    },

    specifications: [],
    getSpecifications: () => {
        set({isLoading: true})
        ProductCardAPI.getSpecifications().then(res => {
            set(state => {
                state.specifications = res.data
                console.log('все доступные спецификации', state.specifications)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('спецификации не получены')
        })
    },
})))/*, {
    name: "editProductCardModal",
    version: 1
})*/);

export default useEditProductCardModal;