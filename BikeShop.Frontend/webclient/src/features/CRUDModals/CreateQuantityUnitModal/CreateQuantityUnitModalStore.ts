import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CreateQuantityUnit, EntitiesAPI, GetQuantityUnitResponse, UpdateQuantityUnit} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"

interface CreateQuantityUnitModalStore {
    openQuantityUnitModal: boolean
    setOpenCreateQuantityUnitModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    quantityUnits: GetQuantityUnitResponse[]
    currentQuantityUnit: GetQuantityUnitResponse | null
    setCurrentQuantityUnit: (quantityUnit: GetQuantityUnitResponse | null) => void

    getQuantityUnits: () => void
    addQuantityUnit: (data: CreateQuantityUnit) => any
    updateQuantityUnit: (updateData: UpdateQuantityUnit) => any
}

const useCreateQuantityUnitModal = create<CreateQuantityUnitModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openQuantityUnitModal: false,
    setOpenCreateQuantityUnitModal: (value: boolean) => set({openQuantityUnitModal: value}),
    isLoading: false,
    errorStatus: 'default',

    currentQuantityUnit: null,
    setCurrentQuantityUnit: (quantityUnit) => {
        set({currentQuantityUnit: quantityUnit})
    },
    quantityUnits: [],
    getQuantityUnits: () => {
        set({isLoading: true})
        EntitiesAPI.QuantityUnit.getQuantityUnits().then(res => {
            set(state => {
                state.quantityUnits = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    addQuantityUnit: (data) => {
        set({isLoading: true})
        EntitiesAPI.QuantityUnit.addQuantityUnit(data).then((res: any) => {
            set(state => {
                state.quantityUnits.push(res.data)
            })
            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    updateQuantityUnit: (updateData) => {
        set({isLoading: true})
        EntitiesAPI.QuantityUnit.updateQuantityUnit(updateData).then((res: any) => {
            EntitiesAPI.QuantityUnit.getQuantityUnits().then(res => {
                set(state => {
                    state.quantityUnits = res.data
                    state.currentQuantityUnit = null
                })
            })
            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "createQuantityUnitModal",
    version: 1
})*/);

export default useCreateQuantityUnitModal;