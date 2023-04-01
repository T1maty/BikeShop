import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CreateSpecification, EntitiesAPI, ProductCardAPI, Specification} from '../../../entities'
import {UpdateSpecification} from '../../../entities/requests/UpdateSpecification'

interface CreateSpecificationModalStore {
    openCreateSpecificationModal: boolean
    setOpenCreateSpecificationModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    currentSpecification: Specification | null
    setCurrentSpecification: (specification: Specification | null) => void

    specifications: Specification[]
    getSpecifications: () => void

    addNewSpecification: (data: CreateSpecification) => any
    updateSpecification: (updateData: UpdateSpecification) => any
}

const useCreateSpecificationModal = create<CreateSpecificationModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openCreateSpecificationModal: false,
    setOpenCreateSpecificationModal: (value: boolean) => set({openCreateSpecificationModal: value}),
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    currentSpecification: null,
    setCurrentSpecification: (specification) => {
        set({currentSpecification: specification})
    },

    specifications: [],
    getSpecifications: () => {
        set({isLoading: true})
        ProductCardAPI.getSpecifications().then(res => {
            set(state => {
                state.specifications = res.data
                console.log('все спецификации', state.specifications)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('спецификации не получены')
        })
    },

    addNewSpecification: (data) => {
        set({isLoading: true})
        EntitiesAPI.Specification.addNewSpecification(data).then((res: any) => {
            set(state => {
                state.specifications.push(res.data)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('спецификация не создана', error)
        })
    },
    updateSpecification: (updateData) => {
        set({isLoading: true})
        EntitiesAPI.Specification.updateSpecification(updateData).then((res: any) => {
            set(state => {
                state.specifications.push(res.data)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('спецификация не обновлена', error)
        })
    },
})))/*, {
    name: "createShopModal",
    version: 1
})*/);

export default useCreateSpecificationModal;