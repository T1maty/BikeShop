import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {EntitiesAPI, ProductCardAPI, Specification} from '../../../entities'
import {UpdateSpecification} from '../../../entities/requests/UpdateSpecification'
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"

interface CreateOptionModalStore {
    openCreateOptionModal: boolean
    setOpenCreateOptionModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    currentOption: Specification | null
    setCurrentOption: (specification: Specification | null) => void

    options: Specification[]
    getOptions: () => void

    addNewOption: (name: string) => any
    updateOption: (updateData: UpdateSpecification) => any
}

const useCreateOptionModal = create<CreateOptionModalStore>()(/*persist(*/devtools(immer((set) => ({
    openCreateOptionModal: false,
    setOpenCreateOptionModal: (value: boolean) => set({openCreateOptionModal: value}),
    isLoading: false,
    errorStatus: 'default',

    currentOption: null,
    setCurrentOption: (option) => {
        set({currentOption: option})
    },

    options: [],
    getOptions: () => {
        // set({isLoading: true})
        // ProductCardAPI.getSpecifications().then(res => {
        //     set(state => {
        //         state.specifications = res.data
        //         console.log('все спецификации', state.specifications)
        //     })
        //     set({isLoading: false})
        // }).catch((error: any) => {
        //     set({errorStatus: 'error'})
        // }).finally(() => {
        //     set({errorStatus: 'default'})
        //     set({isLoading: false})
        // })
    },

    addNewOption: (name) => {
        // set({isLoading: true})
        // EntitiesAPI.Specification.addNewSpecification(name).then((res: any) => {
        //     set(state => {
        //         state.specifications.push(res.data)
        //     })
        //     set({isLoading: false})
        //     set({errorStatus: 'success'})
        // }).catch((error: any) => {
        //     set({errorStatus: 'error'})
        // }).finally(() => {
        //     set({errorStatus: 'default'})
        //     set({isLoading: false})
        // })
    },
    updateOption: (updateData) => {
        // set({isLoading: true})
        // EntitiesAPI.Specification.updateSpecification(updateData).then((res: any) => {
        //     ProductCardAPI.getSpecifications().then(res => {
        //         set(state => {
        //             state.specifications = res.data
        //             state.currentSpecification = null
        //         })
        //     })
        //     set({isLoading: false})
        //     set({errorStatus: 'success'})
        // }).catch((error: any) => {
        //     set({errorStatus: 'error'})
        // }).finally(() => {
        //     set({errorStatus: 'default'})
        //     set({isLoading: false})
        // })
    },
})))/*, {
    name: "createOptionModal",
    version: 1
})*/);

export default useCreateOptionModal;