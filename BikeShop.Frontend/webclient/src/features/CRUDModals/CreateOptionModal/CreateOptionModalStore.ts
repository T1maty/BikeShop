import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CreateOption, EntitiesAPI, UpdateOption} from '../../../entities'
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {ProductOptionsWithVariants}
    from '../../ProductCatalogFeatures/EditProductCardModal/models/ProductOptionsWithVariants'

interface CreateOptionModalStore {
    openCreateOptionModal: boolean
    setOpenCreateOptionModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    currentOption: ProductOptionsWithVariants | null
    setCurrentOption: (option: ProductOptionsWithVariants | null) => void
    options: ProductOptionsWithVariants[]
    getOptions: () => void
    addNewOption: (data: CreateOption) => any
    updateOption: (updateData: UpdateOption) => any
}

const useCreateOptionModal = create<CreateOptionModalStore>()(/*persist(*/devtools(immer((set) => ({
    openCreateOptionModal: false,
    setOpenCreateOptionModal: (value: boolean) => set({openCreateOptionModal: value}),
    isLoading: false,
    errorStatus: 'default',

    currentOption: null,
    setCurrentOption: (option) => {set({currentOption: option})},

    options: [],
    getOptions: () => {
        set({isLoading: true})
        EntitiesAPI.Option.getOptions().then(res => {
            set(state => {
                state.options = res.data
                console.log('все опции', state.options)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    addNewOption: (data) => {
        set({isLoading: true})
        EntitiesAPI.Option.addNewOption(data).then((res: any) => {
            set(state => {
                state.options.push(res.data)
            })
            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            console.log(error)
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    updateOption: (updateData) => {
        set({isLoading: true})
        EntitiesAPI.Option.updateOption(updateData).then((res: any) => {
            EntitiesAPI.Option.getOptions().then(res => {
                set(state => {
                    state.options = res.data
                    state.currentOption = null
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
    name: "createOptionModal",
    version: 1
})*/);

export default useCreateOptionModal;