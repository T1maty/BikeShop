import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../shared"
import {ProductCardImage, ProductCardOption} from '../../../entities/models/Product/ProductCardModels'
import {EditProductCardModalAPI} from "../../../entities/api/EditProductCardModalAPI"
import {ProductOption, ProductSpecification} from "../../../entities"

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    cardOptions: ProductOption[]
    getCardOptions: () => void
    currentCardOptions: ProductCardOption[]


    specifications: ProductSpecification[]
    getSpecifications: () => void

    galleryImages: ProductCardImage[]
    setGalleryImages: (image: any) => void
    uploadNewImage: (data: any) => void
}

const useEditProductCardModal = create<EditProductCardModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openEditProductCardModal: false,
    setOpenEditProductCardModal: (value) => set({openEditProductCardModal: value}),
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),

    cardOptions: [],
    getCardOptions: () => {
        return $api.get<ProductOption[]>('/productcard/getalloptions').then(res => {
            set(state => {
                state.cardOptions = res.data
                console.log('все доступные опции', state.cardOptions)
            })
        }).catch((error: any) => {
            console.log('опции не получены')
        })
    },
    currentCardOptions: [],

    specifications: [],
    getSpecifications: () => {
        // return $api.get<ProductSpecification[]>('/productcard/getallspecifications').then(res => {
        //     set(state => {
        //         state.specifications = res.data
        //         console.log('все доступные спецификации', state.specifications)
        //     })
        // }).catch((error: any) => {
        //     console.log('спецификации не получены')
        // })

        EditProductCardModalAPI.getSpecifications().then(res => {
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
        return $api.post(`/product/addimagetoproduct?productId=${productId}`, data).then(res => {
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