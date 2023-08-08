import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../../entities/enumerables/ErrorStatusTypes";
import {OutcomeActWithProducts} from "../../../../entities/entities/Acts/OutcomeAct/OutcomeActWithProducts";
import {Product} from "entities";
import {OutcomeActProduct} from "../../../../entities/entities/Acts/OutcomeAct/OutcomeActProduct";
import {OutcomeAct} from "../../../../entities/entities/Acts/OutcomeAct/OutcomeAct";
import {LocalStorage} from "../../../../entities";
import {OutcomeActAPI} from "../../../../entities/api/Acts/OutcomeActAPI";

interface p {
    isLoading: boolean
    errorStatus: ErrorStatusTypes
    isCreating: boolean
    setIsCreating: (v: boolean) => void
    currentAct: OutcomeActWithProducts
    setCurrentAct: (value: OutcomeActWithProducts) => void

    clear: () => void

    setDescription: (v: string) => void
    addProduct: (v: Product) => void
    setProducts: (v: OutcomeActProduct[]) => void

    saveHandler: (s: () => void) => void
}

const useOutcomeActPage = create<p>()(persist(devtools(immer((set, get) => ({
    currentAct: {outcomeAct: {} as OutcomeAct, products: []},
    isLoading: false,
    errorStatus: 'default',
    isCreating: false,

    saveHandler: (s) => {
        let data = {...get().currentAct}
        data.outcomeAct.shopId = parseFloat(LocalStorage.shopId()!)
        // @ts-ignore
        data.outcomeAct = {...data.outcomeAct, userId: LocalStorage.userId()}

        set({isLoading: true})
        console.log(data)

        if (get().isCreating) {
            OutcomeActAPI.create(data).then((r) => {
                get().setIsCreating(false)
                get().setCurrentAct(r.data)
                s()
            }).catch((r) => {
                console.log(r)
                set({errorStatus: "error"})
            }).finally(() => {
                set({isLoading: true})
                set({errorStatus: "default"})
            })
        } else {
            OutcomeActAPI.update(data).then((r => {
                get().setCurrentAct(r.data)
                s()
            })).catch((r) => {
                console.log(r)
                set({errorStatus: "error"})
            }).finally(() => {
                set({isLoading: true})
                set({errorStatus: "default"})
            })
        }
    },
    setProducts: (v) => {
        if (get().currentAct != null) set({currentAct: {outcomeAct: get().currentAct?.outcomeAct!, products: v}})
    },
    addProduct: (v) => {
        if (get().currentAct.products.find(n => n.productId === v.id) != null) {
            let newData = get().currentAct.products.map(n => {
                if (n.productId === v.id) return {...n, quantity: n.quantity + 1}
                else return n
            })
            set(state => {
                state.currentAct.products = newData
            })
        } else {
            let prod: OutcomeActProduct = {
                id: 0,
                createdAt: Date.UTC.toString(),
                updatedAt: Date.UTC.toString(),
                enabled: true,
                outcomeActId: get().currentAct.outcomeAct.id,
                productId: v.id,
                name: v.name,
                description: "",
                catalogKey: v.catalogKey,
                barcode: v.barcode,
                manufBarcode: v.manufacturerBarcode,
                quantityUnitName: v.quantityUnitName,
                incomePrice: v.incomePrice,
                dealerPrice: v.dealerPrice,
                retailPrice: v.retailPrice,
                brandName: " ",
                quantity: 1,
            }
            set(state => {
                state.currentAct.products.push(prod)
            })
        }

    },
    setDescription: (v) => {
        if (get().currentAct != null) set(state => {
            state.currentAct != null ? state.currentAct.outcomeAct.description = v : ""
        })
    },
    clear: () => {

        set(state => {
            state.currentAct.outcomeAct.description = ""
        })
        set(state => {
            state.currentAct.outcomeAct.outcomeActStatus = "Created"
        })
        set(state => {
            state.currentAct.outcomeAct.id = 0
        })
        set(state => {
            state.currentAct.outcomeAct.shopId = parseFloat(LocalStorage.shopId()!)
        })
        set(state => {
            state.currentAct.outcomeAct.enabled = true
        })
        set(state => {
            state.currentAct.outcomeAct.createdAt = Date.UTC.toString()
        })
        set(state => {
            state.currentAct.outcomeAct.updatedAt = Date.UTC.toString()
        })
        set(state => {
            state.currentAct.outcomeAct.userCreatedId = LocalStorage.userId()!
        })
        set(state => {
            state.currentAct.outcomeAct.userUpdatedId = LocalStorage.userId()!
        })

        set(state => {
            state.currentAct.products = []
        })

        set({isCreating: true})
    },
    setIsCreating: (v) => {
        set({isCreating: v})
    },
    setCurrentAct: (value) => {
        set(state => {
            state.currentAct = value
        })
    },

}))), {
    name: "useOutcomeActPage",
    version: 1
}));

export default useOutcomeActPage;