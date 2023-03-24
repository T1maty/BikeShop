import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../shared"
import {AxiosResponse} from "axios"
import {
    ProductCardOption, ProductCardOptionVariant,
    ProductCardSpecification, ProductCardUserSpecification
} from '../../../entities/models/ProductCardModels'

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    cardOptions: ProductCardOption[]
    getCardOptions: () => void
    currentCardOptions: ProductCardOption[]
    setCurrentCardOptions: (currentCardOptions: ProductCardOption[]) => void
    addCurrentCardOption: (option: ProductCardOption) => void

    specifications: ProductCardSpecification[]
    getSpecifications: () => void
    currentSpecifications: ProductCardUserSpecification[]
    setCurrentSpecifications: (currentSpecifications: ProductCardUserSpecification[]) => void
    addCurrentSpecification: (spec: ProductCardUserSpecification) => void
}

const useEditProductCardModal = create<EditProductCardModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openEditProductCardModal: false,
    setOpenEditProductCardModal: (value) => set({openEditProductCardModal: value}),
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),

    cardOptions: [],
    getCardOptions: () => {
        return $api.get<ProductCardOption[]>('/productcard/getalloptions').then(res => {
            set(state => {
                state.cardOptions = res.data
                console.log('все опции', state.cardOptions)
            })
        }).catch((error: any) => {
            console.log('опции не получены')
        })
    },
    currentCardOptions: [],
    setCurrentCardOptions: (currentCardOptions) => set(state => {
        state.currentCardOptions = currentCardOptions
    }),
    addCurrentCardOption: (option) => set(state => {
        return {currentCardOptions: [option, ...state.currentCardOptions]}
    }),

    specifications: [],
    getSpecifications: () => {
        return $api.get<ProductCardSpecification[]>('/productcard/getallspecifications').then(res => {
            set(state => {
                state.specifications = res.data
                console.log('все спецификации', state.specifications)
            })
        }).catch((error: any) => {
            console.log('спецификации не получены')
        })
    },
    currentSpecifications: [],
    setCurrentSpecifications: (currentSpecifications) => set(state => {
        state.currentSpecifications = currentSpecifications
    }),
    addCurrentSpecification: (spec) => set(state => {
        return {currentSpecifications: [spec, ...state.currentSpecifications]}
    }),
})))/*, {
    name: "editProductCardModal",
    version: 1
})*/);

export default useEditProductCardModal;