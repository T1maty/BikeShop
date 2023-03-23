import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../shared"
import {AxiosResponse} from "axios"
import {ProductCardOption, ProductCardSpecification} from "../../../entities/models/ProductCardModels"

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    // currentCurrency: any // CreateShopResponse | null
    // setCurrentCurrency: (currency: any) => void
    galleryImages: any[]
    getGalleryImages: () => void
    cardOptions: ProductCardOption[]
    getCardOptions: () => void
    specifications: ProductCardSpecification[]
    getSpecifications: () => void
    // specifications: ProductCardSpecification[]
    // setSpecification: (spec: ProductCardSpecification) => void
}

const useEditProductCardModal = create<EditProductCardModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openEditProductCardModal: false,
    setOpenEditProductCardModal: (value) => set({openEditProductCardModal: value}),
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),

    // currentCurrency: null,
    // setCurrentCurrency: (currency) => {set({currentCurrency: currency})},
    galleryImages: [],
    getGalleryImages: () => {
        return $api.get('/productcard/getalloptions').then(res => {
            // set(state => {
            //     state.cardOptions = res.data
            //     console.log('все опции', state.cardOptions)
            // })
        }).catch((error: any) => {
            console.log('фото не получены')
        })
    },
    cardOptions: [],
    getCardOptions: () => {
        return $api.get<ProductCardOption[]>('/productcard/getalloptions').then(res => {
            set(state => {
                state.cardOptions = res.data
                console.log('все опции', state.cardOptions)
            })
        }).catch((error: any) => {
            console.log('магазины не получены')
        })
    },
    specifications: [],
    getSpecifications: () => {
        return $api.get<ProductCardSpecification[]>('/productcard/getallspecifications').then(res => {
            set(state => {
                state.specifications = res.data
                console.log('все спецификации', state.specifications)
            })
        }).catch((error: any) => {
            console.log('магазины не получены')
        })
    },
    // specifications: [],
    // setSpecification: (spec) => set(state => {
    //     return {specifications: [spec, ...state.specifications]}
    // }),
})))/*, {
    name: "editProductCardModal",
    version: 1
})*/);

export default useEditProductCardModal;