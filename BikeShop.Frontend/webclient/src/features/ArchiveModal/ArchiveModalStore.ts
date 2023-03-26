import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {AxiosResponse} from 'axios'
import {CreateServiceResponse, ServiceItem} from "../../entities"
import {EntitiesAPI} from "../../entities/api/EntitiesAPI"

interface ArchiveModalStore {
    openArchiveModal: boolean
    setOpenArchiveModal: (value: boolean) => void
    isLoading: boolean

    currentService: ServiceItem | null
    setCurrentService: (service: ServiceItem | null) => void
    services: ServiceItem[]
    setServices: (services: ServiceItem[]) => void
    filteredServices: ServiceItem[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void

    getAllServicesInfo: () => any // надо исправить тип
}

const useArchiveModal = create<ArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openArchiveModal: true,
    setOpenArchiveModal: (value) => set({openArchiveModal: value}),
    isLoading: false,

    currentService: null,
    setCurrentService: (service) => set({currentService: service}),
    services: [],
    setServices: (services) => set(state => {state.services = services}),
    filteredServices: [],
    setFilteredServices: (filteredServices) => set(state => {state.filteredServices = filteredServices}),

    getAllServicesInfo: () => {
        set({isLoading: true});
        return EntitiesAPI.Archive.getAllServicesInfo().then(res => {
            set(state => {
                state.services = res.data
                state.filteredServices = res.data
                    .filter((item: CreateServiceResponse) => item.status === 'Ended')
            })
            set({isLoading: false})
        })
    },
})))/*, {
    name: "archiveModalStore",
    version: 1
})*/);

export default useArchiveModal;
