import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {EntitiesAPI, Specification} from '../../../entities'
import {UpdateSpecification} from '../../../entities/requests/UpdateSpecification'
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"

interface CreateSpecificationModalStore {
    openCreateSpecificationModal: boolean
    setOpenCreateSpecificationModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    currentSpecification: Specification | null
    setCurrentSpecification: (specification: Specification | null) => void

    specifications: Specification[]
    getSpecifications: () => void

    addNewSpecification: (name: string) => any
    updateSpecification: (updateData: UpdateSpecification) => any
}

const useCreateSpecificationModal = create<CreateSpecificationModalStore>()(/*persist(*/devtools(immer((set) => ({
    openCreateSpecificationModal: false,
    setOpenCreateSpecificationModal: (value: boolean) => set({openCreateSpecificationModal: value}),
    isLoading: false,
    errorStatus: 'default',

    currentSpecification: null,
    setCurrentSpecification: (specification) => {
        set({currentSpecification: specification})
    },

    specifications: [],
    getSpecifications: () => {
        set({isLoading: true})
        EntitiesAPI.Specification.getSpecifications().then(res => {
            set(state => {
                state.specifications = res.data
                console.log('все спецификации', state.specifications)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    addNewSpecification: (name) => {
        set({isLoading: true})
        EntitiesAPI.Specification.addNewSpecification(name).then((res: any) => {
            set(state => {
                state.specifications.push(res.data)
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
    updateSpecification: (updateData) => {
        set({isLoading: true})
        EntitiesAPI.Specification.updateSpecification(updateData).then((res: any) => {
            EntitiesAPI.Specification.getSpecifications().then(res => {
                set(state => {
                    state.specifications = res.data
                    state.currentSpecification = null
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
    name: "createShopModal",
    version: 1
})*/);

export default useCreateSpecificationModal;