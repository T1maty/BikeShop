import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {EntitiesAPI, ProductCardAPI, ProductFullData, ProductSpecification, UpdateOption} from '../../../entities'
import {ProductOptionsWithVariants} from "./models/ProductOptionsWithVariants"
import {UpdateProductCardFormModel} from "./models/UpdateProductCardFormModel"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {ProductFilter} from "../../../entities/entities/ProductFilter";
import {ProductOptionVariantBind} from "entities";

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    isError: boolean
    setIsError: (value: boolean) => void
    errorStatus: ErrorStatusTypes

    currentProduct: ProductFullData
    getProductCard: (productId: number) => void
    updateProductCard: (data: UpdateProductCardFormModel) => void

    allOptions: ProductOptionsWithVariants[]
    getAllOptions: () => void

    allSpecifications: ProductSpecification[]
    getAllSpecifications: () => void

    allFilters: ProductFilter[],
    getAllFilters: () => void,

    createOption: (option: string, variant: string, s: (v: ProductOptionsWithVariants) => void) => void
    addOptionVariant: (option: ProductOptionVariantBind, variant: string, s: (v: ProductOptionsWithVariants) => void) => void
}

const useEditProductCardModal = create<EditProductCardModalStore>()(/*persist(*/devtools(immer((set) => ({
    addOptionVariant: (option, variant, s) => {
        set({isLoading: true})
        let data:UpdateOption = {
            id: option.optionId,
            name: option.name,
            optionVariants: [
                {
                    id: number
                    name: string
                    enabled: boolean
                }
            ],
            enabled: true
        }
        EntitiesAPI.Option.updateOption({name: option, optionVariants: [variant]}).then(res => {
            set(state => {
                state.allOptions.push(res.data)
            })
            set({isLoading: false})
            s(res.data)
        }).catch(() => {
            set({errorStatus: 'error'})

        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    createOption: (option, variant, s) => {
        set({isLoading: true})
        EntitiesAPI.Option.addNewOption({name: option, optionVariants: [variant]}).then(res => {
            set(state => {
                state.allOptions.push(res.data)
            })
            set({isLoading: false})
            s(res.data)
        }).catch(() => {
            set({errorStatus: 'error'})

        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    allFilters: [],
    getAllFilters: () => {
        set({isLoading: true})
        EntitiesAPI.Filters.getFilters().then(res => {
            set(state => {
                state.allFilters = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    openEditProductCardModal: false,
    setOpenEditProductCardModal: (value) => set({openEditProductCardModal: value}),
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),
    isError: false,
    setIsError: (value) => set({isError: value}),
    errorStatus: 'default',

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
            set({errorStatus: 'error'})
        }).finally(() => {
            set({isLoading: false})
            set({errorStatus: 'default'})
        })
    },
    updateProductCard: (data) => {
        set({isLoading: true})
        ProductCardAPI.updateProductCard(data).then((res: any) => {
            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({isLoading: false})
            set({errorStatus: 'default'})
        })
    },

    allOptions: [],
    getAllOptions: () => {
        set({isLoading: true})
        EntitiesAPI.Option.getOptions().then(res => {
            set(state => {
                state.allOptions = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    allSpecifications: [],
    getAllSpecifications: () => {
        set({isLoading: true})
        EntitiesAPI.Specification.getSpecifications().then(res => {
            set(state => {
                state.allSpecifications = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "editProductCardModal",
    version: 1
})*/);

export default useEditProductCardModal;