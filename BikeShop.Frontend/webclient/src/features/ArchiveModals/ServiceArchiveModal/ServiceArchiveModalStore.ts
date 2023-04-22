import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {CreateServiceResponse, EntitiesAPI, ServiceItem} from "../../../entities"

interface ServiceArchiveModalStore {
    openServiceArchiveModal: boolean
    setOpenServiceArchiveModal: (value: boolean) => void
    isLoading: boolean

    currentService: ServiceItem | null
    setCurrentService: (service: ServiceItem | null) => void
    services: ServiceItem[]
    setServices: (services: ServiceItem[]) => void
    filteredServices: ServiceItem[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void

    getAllServicesInfo: () => any // надо исправить тип
}

const useServiceArchiveModal = create<ServiceArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openServiceArchiveModal: false,
    setOpenServiceArchiveModal: (value) => set({openServiceArchiveModal: value}),
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
    name: "archiveServiceModalStore",
    version: 1
})*/);

export default useServiceArchiveModal;
