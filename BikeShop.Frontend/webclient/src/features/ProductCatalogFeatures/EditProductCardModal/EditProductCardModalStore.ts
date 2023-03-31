import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {
    CatalogProductItem,
    ProductCardAPI,
    ProductOption,
    ProductSpecification,
    ProductTagForCard,
    UpdateProductCard
} from '../../../entities'

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    currentProduct: CatalogProductItem
    getProductCard: (productId: number) => void
    updateProductCard: (data: UpdateProductCard) => void

    productStatus: string
    productCardDescription: string
    setProductCardDescription: (desc: string) => void

    cardOptions: ProductOption[]
    currentCardOptions: ProductOption[]
    getCardOptions: () => void

    specifications: ProductSpecification[]
    getSpecifications: () => void

    productTags: ProductTagForCard[]
    setProductTags: (tags: ProductTagForCard[]) => void

}

const useEditProductCardModal = create<EditProductCardModalStore>()(/*persist(*/devtools(immer((set) => ({
    openEditProductCardModal: false,
    setOpenEditProductCardModal: (value) => set({openEditProductCardModal: value}),
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),

    currentProduct: {} as CatalogProductItem,
    getProductCard: (productId: number) => {
        set({isLoading: true})
        ProductCardAPI.getProductCardById(productId).then(res => {
            set(state => {
                state.currentProduct = res.data
                state.productStatus = res.data.product.checkStatus
                state.productTags = res.data.productTags

                console.log('карточка из таблицы', state.currentProduct)
                // console.log('изображения карточки', state.galleryImages)
                // console.log('теги карточки', state.productTags)
            })
            set({isLoading: false})
            set({openEditProductCardModal: true})
        }).catch((error: any) => {
            console.log('карточка не получена')
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
    productCardDescription: '',
    setProductCardDescription: (desc) => set({productCardDescription: desc}),

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

    productTags: [],
    setProductTags: (tags) => set(state => {
        state.productTags = tags
    }),

})))/*, {
    name: "editProductCardModal",
    version: 1
})*/);

export default useEditProductCardModal;