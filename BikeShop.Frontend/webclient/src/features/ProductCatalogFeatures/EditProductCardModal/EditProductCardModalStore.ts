import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ProductCardImage, ProductCardOption} from '../../../entities/models/Product/ProductCardModels'
import {ProductCardAPI} from "../../../entities/api/ProductCardAPI"
import {ProductOption, ProductSpecification} from "../../../entities"

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    cardOptions: ProductOption[]
    currentCardOptions: ProductCardOption[]
    getCardOptions: () => void

    specifications: ProductSpecification[]
    getSpecifications: () => void

    galleryImages: ProductCardImage[]
    setGalleryImages: (image: any) => void
    uploadNewImage: (data: any) => void
}

const useEditProductCardModal = create<EditProductCardModalStore>()(/*persist(*/devtools(immer((set) => ({
    openEditProductCardModal: false,
    setOpenEditProductCardModal: (value) => set({openEditProductCardModal: value}),
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),

    cardOptions: [],
    currentCardOptions: [],
    getCardOptions: () => {
        ProductCardAPI.getOptions().then(res => {
            set(state => {
                state.cardOptions = res.data
                console.log('все доступные опции', state.cardOptions)
            })
        }).catch((error: any) => {
            console.log('опции не получены')
        })
    },

    specifications: [],
    getSpecifications: () => {
        ProductCardAPI.getSpecifications().then(res => {
            set(state => {
                state.specifications = res.data
                console.log('все доступные спецификации', state.specifications)
            })
        }).catch((error: any) => {
            console.log('спецификации не получены')
        })
    },

    galleryImages: [],
    setGalleryImages: (image) => set(state => {
        return {galleryImages: [image, ...state.galleryImages]}
    }),
    uploadNewImage: (data) => {
        // set({isLoading: true})
        const productId = 1

        return ProductCardAPI.uploadNewImage(data).then(res => {
            set(state => {
                state.galleryImages.push(res.data)
            })
            // set({isLoading: false})
        }).catch((error: any) => {
            console.log('изорабражение не загружено', error)
        })
    },
})))/*, {
    name: "editProductCardModal",
    version: 1
})*/);

export default useEditProductCardModal;