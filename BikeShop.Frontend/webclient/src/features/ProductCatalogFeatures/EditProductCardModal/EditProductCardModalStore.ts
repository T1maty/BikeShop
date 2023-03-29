import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ProductCardAPI} from "../../../entities/api/ProductCardAPI"
import {
    CatalogProductItem, ProductImage,
    ProductOption, ProductSpecification, ProductTag, ProductTagForCard
} from '../../../entities'

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    currentProduct: CatalogProductItem
    getProductCard: (productId: number) => void

    cardOptions: ProductOption[]
    currentCardOptions: ProductOption[]
    getCardOptions: () => void

    specifications: ProductSpecification[]
    getSpecifications: () => void

    productTags: ProductTagForCard[]
    setProductTags: (tags: ProductTagForCard[]) => void

    galleryImages: ProductImage[]
    setGalleryImages: (images: ProductImage[]) => void
    uploadNewImage: (data: any) => void
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
                state.productTags = res.data.productTags
                state.galleryImages = res.data.productImages
                console.log('карточка из таблицы', state.currentProduct)
            })
            set({isLoading: false})
            set({openEditProductCardModal: true})
        }).catch((error: any) => {
            console.log('карточка не получена')
        })
    },

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

    galleryImages: [],
    setGalleryImages: (images) => set(state => {
        state.galleryImages = images
    }),
    uploadNewImage: (data) => {
        set({isLoading: true})
        const productId = 1

        return ProductCardAPI.uploadNewImage(data).then(res => {
            set(state => {
                state.galleryImages.push(res.data)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('изорабражение не загружено', error)
        })
    },
})))/*, {
    name: "editProductCardModal",
    version: 1
})*/);

export default useEditProductCardModal;