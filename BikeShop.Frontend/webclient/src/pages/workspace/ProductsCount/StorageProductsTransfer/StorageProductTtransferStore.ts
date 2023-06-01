import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {
    ProductStorageMoveFullData
} from "../../../../entities/models/Acts/ProductStorageMove/ProductStorageMoveFullData";
import {ProductStorageMove} from "../../../../entities/models/Acts/ProductStorageMove/ProductStorageMove";
import {ProductStorageMoveProduct} from "../../../../entities/models/Acts/ProductStorageMove/ProductStorageMoveProduct";
import {CreateStorageResponse} from "../../../../entities/responses/StorageResponse";
import {EntitiesAPI, LocalStorage, Product} from "../../../../entities";
import {ErrorStatusTypes} from "../../../../entities/enumerables/ErrorStatusTypes";
import {ProductStorageMoveAPI} from "../../../../entities/api/Acts/ProductStorageMoveAPI";

interface p {
    currentMove: ProductStorageMoveFullData
    setCurrentProducts: (v: ProductStorageMoveProduct[]) => void
    addProduct: (n: Product) => void
    setDescription: (n: string) => void
    clearCurrent: () => void

    isCreating: boolean
    setIsCreating: (v: boolean) => void

    selectedStorageForTransferFrom: CreateStorageResponse | null
    setSelectedStorageForTransferFrom: (storageId: number) => void
    selectedStorageForTransferTo: CreateStorageResponse | null
    setSelectedStorageForTransferTo: (storageId: number) => void

    storages: CreateStorageResponse[]
    getStorages: () => void

    isLoading: boolean
    errorStatus: ErrorStatusTypes

    saveHandler: (onSuccess: () => void, onFail: () => void) => void
    openHandler: (v: ProductStorageMoveFullData) => void
}

export const useProsuctStorageTransfer = create<p>()(persist(devtools(immer((set, get) => ({
    currentMove: {products: [], productMove: {description: ""} as ProductStorageMove},
    setCurrentProducts: (v) => {
        set({currentMove: {productMove: get().currentMove.productMove, products: v.filter(k => k.quantity != 0)}})
    },
    addProduct: (n) => {
        let finded = false
        let newData = get().currentMove.products.map((np) => {
            if (n.id === np.productId) {
                finded = true
                return ({...np, quantity: np.quantity + 1})
            } else return np
        })
        if (!finded) newData.push({
            id: 0,
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
            enabled: true,
            productMoveId: 0,
            productId: n.id,
            name: n.name,
            description: '',
            catalogKey: n.catalogKey,
            barcode: n.barcode,
            manufacturerBarcode: n.manufacturerBarcode,
            quantityUnitName: n.quantityUnitName,
            quantity: 1
        } as ProductStorageMoveProduct)
        get().setCurrentProducts(newData)
    },
    setDescription: (n) => {
        set(state => {
            state.currentMove.productMove.description = n
        })
    },
    clearCurrent: () => {
        set({selectedStorageForTransferFrom: null})
        set({selectedStorageForTransferTo: null})
        set({isCreating: true})
        set({currentMove: {products: [], productMove: {description: ""} as ProductStorageMove},})
    },

    isCreating: true,
    setIsCreating: (v) => {
        set({isCreating: v})
    },

    selectedStorageForTransferFrom: null,
    setSelectedStorageForTransferFrom: (storageId) => {
        let storage = get().storages.find(st => st.id === storageId)

        if (storage === undefined) console.log('storage UNDEFINED')
        set(state => {
            state.selectedStorageForTransferFrom = storage!
        })
    },
    selectedStorageForTransferTo: null,
    setSelectedStorageForTransferTo: (storageId) => {
        let storage = get().storages.find(st => st.id === storageId)

        if (storage === undefined) console.log('storage UNDEFINED')
        set(state => {
            state.selectedStorageForTransferTo = storage!
        })
    },

    storages: [],
    getStorages: () => {
        set({isLoading: true})
        EntitiesAPI.Storage.getStorages().then(res => {
            set(state => {
                state.storages = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    isLoading: false,
    errorStatus: 'default',

    saveHandler: (s, f) => {
        set({isLoading: true})
        let data = {
            products: get().currentMove.products.map(g => {
                if (g.description === null) {
                    return {...g, description: ""}
                } else {
                    return g
                }
            }),
            productMove: {
                ...get().currentMove.productMove,
                user: LocalStorage.userId(),
                movingFromSkladId: get().selectedStorageForTransferFrom?.id,
                movingToSkladId: get().selectedStorageForTransferTo?.id
            }
        } as ProductStorageMoveFullData
        if (get().isCreating) {
            ProductStorageMoveAPI.create(data).then(n => {
                set({currentMove: n.data})
                set({isCreating: false})
                s()
            }).catch(n => {
                set({errorStatus: 'error'})
                f()
            }).finally(() => {
                set({isLoading: false})
            })
        } else {
            ProductStorageMoveAPI.update(data).then(n => {
                set({currentMove: n.data})
                s()
            }).catch(n => {
                set({errorStatus: 'error'})
                f()
            }).finally(() => {
                set({isLoading: false})
            })
        }
    },
    openHandler: (v) => {
        get().getStorages()
        set({currentMove: v})
        set({isCreating: false})
        get().setSelectedStorageForTransferTo(v.productMove.movingToSkladId)
        get().setSelectedStorageForTransferFrom(v.productMove.movingFromSkladId)
    }
}))), {
    name: "StorageProductTransferStore",
    version: 1
}));