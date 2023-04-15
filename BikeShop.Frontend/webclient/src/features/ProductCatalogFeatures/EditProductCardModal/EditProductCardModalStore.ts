import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {EntitiesAPI, ProductCardAPI, ProductFullData, ProductSpecification} from '../../../entities'
import {ProductOptionsWithVariants} from "./models/ProductOptionsWithVariants"
import {UpdateProductCardFormModel} from "./models/UpdateProductCardFormModel";

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void

    isLoading: boolean
    setIsLoading: (value: boolean) => void

    currentProduct: ProductFullData
    getProductCard: (productId: number) => void
    updateProductCard: (data: UpdateProductCardFormModel) => void


    isError: boolean
    setIsError: (value: boolean) => void

    allOptions: ProductOptionsWithVariants[]
    getAllOptions: () => void

    allSpecifications: ProductSpecification[]
    getAllSpecifications: () => void
}

const useEditProductCardModal = create<EditProductCardModalStore>()(/*persist(*/devtools(immer((set) => ({
    openEditProductCardModal: false,
    setOpenEditProductCardModal: (value) => set({openEditProductCardModal: value}),
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),
    isError: false,
    setIsError: (value) => set({isError: value}),

    currentProduct: {} as ProductFullData,
    getProductCard: (productId: number) => {
        set({isLoading: true})
        ProductCardAPI.getProductCardById(productId).then(res => {
            set(state => {
                state.currentProduct = res.data
                console.log('карточка из таблицы', state.currentProduct)
            })
            set({isLoading: false})
            set({openEditProductCardModal: true})
        }).catch((error: any) => {
            set({isError: true})
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
            // set({isError: true})
            console.log('карточка не обновлена', error)
        }).finally(() => {
            set({isLoading: false})
            // set({isError: false})
        })
    },

    allOptions: [],
    getAllOptions: () => {
        set({isLoading: true})
        EntitiesAPI.Option.getOptions().then(res => {
            set(state => {
                state.allOptions = res.data
                console.log('все доступные опции', state.allOptions)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('опции не получены')
        })
    },

    allSpecifications: [],
    getAllSpecifications: () => {
        set({isLoading: true})
        EntitiesAPI.Specification.getSpecifications().then(res => {
            set(state => {
                state.allSpecifications = res.data
                console.log('все доступные спецификации', state.allSpecifications)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('спецификации не получены')
            set({isLoading: false})
        })
    },


})))/*, {
    name: "editProductCardModal",
    version: 1
})*/);

export default useEditProductCardModal;