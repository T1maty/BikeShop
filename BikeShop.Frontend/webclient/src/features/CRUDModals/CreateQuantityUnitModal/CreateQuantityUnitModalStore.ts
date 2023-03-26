import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../shared"
import {AxiosResponse} from "axios"
import {CreateQuantityUnit, GetQuantityUnitResponse, UpdateQuantityUnit} from "../../../entities"
import {QuantityUnitAPI} from "../../../entities/api/QuantityUnit";

interface CreateQuantityUnitModalStore {
    openQuantityUnitModal: boolean
    setOpenCreateQuantityUnitModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

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
    setIsLoading: (value: boolean) => set({isLoading: value}),

    currentQuantityUnit: null,
    setCurrentQuantityUnit: (quantityUnit) => {
        set({currentQuantityUnit: quantityUnit})
    },
    quantityUnits: [],
    getQuantityUnits: () => {
        QuantityUnitAPI.getQuantityUnits().then(res => {
            set(state => {
                state.quantityUnits = res.data
                console.log('все ед.измерения', state.quantityUnits)
            })
        }).catch((error: any) => {
            console.log('ед.измерения не получены')
        })
    },
    addQuantityUnit: (data) => {
        QuantityUnitAPI.addQuantityUnit(data).then((res: any) => {
            set(state => {
                state.quantityUnits.push(res.data)
            })
        }).catch((error: any) => {
            console.log('ед.измерения не создана', error)
        })
    },
    updateQuantityUnit: (updateData) => {
        QuantityUnitAPI.updateQuantityUnit(updateData).then((res: any) => {
            //
        }).catch((error: any) => {
            console.log('ед.измерения не обновлена', error)
        })
    },
})))/*, {
    name: "createQuantityUnitModal",
    version: 1
})*/);

export default useCreateQuantityUnitModal;