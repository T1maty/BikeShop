import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../shared"
import {AxiosResponse} from "axios"
import {GetQuantityUnitResponse} from "../../entities"

interface CreateQuantityUnitModalStore {
    openQuantityUnitModal: boolean
    setOpenCreateQuantityUnitModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    quantityUnits: GetQuantityUnitResponse[]
    currentQuantityUnit: GetQuantityUnitResponse | null
    setCurrentQuantityUnit: (quantityUnit: GetQuantityUnitResponse | null) => void

    getQuantityUnits: () => void
    // addQuantityUnit: (data: any) => any
    // updateQuantityUnit: (updateData: any) => any
}

const useCreateQuantityUnitModal = create<CreateQuantityUnitModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openQuantityUnitModal: false,
    setOpenCreateQuantityUnitModal: (value: boolean) => set({openQuantityUnitModal: value}),
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    currentQuantityUnit: null,
    setCurrentQuantityUnit: (quantityUnit) => {set({currentQuantityUnit: quantityUnit})},
    quantityUnits: [],
    getQuantityUnits: () => {
        return $api.get<GetQuantityUnitResponse[]>('/quantityunit/getall').then(res => {
            set(state => {
                state.quantityUnits = res.data
                console.log('все валюты', state.quantityUnits)
            })
        }).catch((error: any) => {
            console.log('валюты не получены')
        })
    },
    // addQuantityUnit: (data) => {
    //     return $api.post('/quantityunit/create', data).then(res => {
    //         // set(state => {
    //         //     state.quantityUnits.push(res.data)
    //         // })
    //     }).catch((error: any) => {
    //         console.log('валюта не создана', error)
    //     })
    // },
    // updateQuantityUnit: (updateData) => {
    //     return $api.put('/quantityunit/update', updateData).then(res => {
    //         // set(state => {
    //         //     state.quantityUnits.push(res.data)
    //         // })
    //     }).catch((error: any) => {
    //         console.log('валюта не обновлена', error)
    //     })
    // },
})))/*, {
    name: "createQuantityUnitModal",
    version: 1
})*/);

export default useCreateQuantityUnitModal;