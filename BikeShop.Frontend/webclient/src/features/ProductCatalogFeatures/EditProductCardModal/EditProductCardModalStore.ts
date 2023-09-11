import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {EntitiesAPI, ProductCardAPI, ProductFullData} from '../../../entities'
import {ProductOptionsWithVariants} from "./models/ProductOptionsWithVariants"
import {UpdateProductCardFormModel} from "./models/UpdateProductCardFormModel"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
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
    setOptions: (v: ProductOptionVariantBind[]) => void
    setStatus: (v: string) => void
    setDescription: (v: string) => void
    removeProductBind: (id: number) => void
    addProductBind: (p: ProductFullData) => void
    getProductCard: (productId: number) => void
    updateProductCard: () => void

    allOptions: ProductOptionsWithVariants[]
    getAllOptions: () => void

    createOption: (option: string, variant: string, s: (v: ProductOptionsWithVariants) => void) => void
    addOptionVariant: (option: ProductOptionVariantBind, variant: string, s: (v: ProductOptionsWithVariants) => void) => void

    getProductBindIndex: (id: number) => number
    selectedBindedProductId: number
    setSelectedBindedProductId: (v: number) => void

}

const useEditProductCardModal = create<EditProductCardModalStore>()(persist(devtools(immer((set, get) => ({
    setOptions: (v) => {
        set(state => {
            state.currentProduct.productOptions = v
        })
    },
    removeProductBind: (v) => {
        set(state => {
            state.currentProduct.bindedProducts = state.currentProduct.bindedProducts.filter(n => n.id != v)
        })
        set(state => {
            state.currentProduct.productImages = state.currentProduct.productImages.filter(n => n.productId != v)
        })
        set(state => {
            state.currentProduct.productOptions = state.currentProduct.productOptions.filter(n => n.productId != v)
        })
    },
    setDescription: (v) => {
        set(state => {
            state.currentProduct.productCard.description = v
        })
    },
    setStatus: (v) => {
        set(state => {
            state.currentProduct.product.checkStatus = v
        })
    },
    addProductBind: (p) => {
        set({
            currentProduct: {
                ...get().currentProduct,
                bindedProducts: [...get().currentProduct.bindedProducts, p.product]
            }
        })
        set(state => {
            state.currentProduct.productOptions.push(...p.productOptions)
        })
        set(state => {
            state.currentProduct.productImages.push(...p.productImages)
        })

    },
    setSelectedBindedProductId: (v) => set({selectedBindedProductId: v}),
    selectedBindedProductId: 0,
    getProductBindIndex: (id) => {
        return get().currentProduct.bindedProducts.findIndex(n => n.id === id)
    },
    addOptionVariant: (option, variant, s) => {
        set({isLoading: true})
        EntitiesAPI.Option.addOptionVariant(option.optionId, variant).then(res => {
            let data = get().allOptions.map(n => {
                if (n.id === res.data.id) return res.data
                return n
            })
            set({allOptions: data})
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
    updateProductCard: () => {
        let buf = get().currentProduct
        let data: UpdateProductCardFormModel = {
            id: buf.product.id,
            checkStatus: buf.product.checkStatus,
            productCard: {description: buf.productCard.description, shortDescription: buf.productCard.descriptionShort},
            productOptions: buf.productOptions,
            bindedProducts: buf.bindedProducts
        }
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
}))), {
    name: "editProductCardModal",
    version: 1
}));

export default useEditProductCardModal;