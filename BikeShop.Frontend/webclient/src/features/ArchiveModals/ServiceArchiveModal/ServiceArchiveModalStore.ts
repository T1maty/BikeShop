import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {CreateServiceResponse, EntitiesAPI, ServiceAPI, ServiceItem} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes";

interface ServiceArchiveModalStore {
    openServiceArchiveModal: boolean
    setOpenServiceArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

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
    errorStatus: 'default',

    currentService: null,
    setCurrentService: (service) => set({currentService: service}),
    services: [],
    setServices: (services) => set(state => {state.services = services}),
    filteredServices: [],
    setFilteredServices: (filteredServices) => set(state => {state.filteredServices = filteredServices}),

    getAllServicesInfo: () => {
        set({isLoading: true});
        return ServiceAPI.getAllServicesInfo().then(res => {
            set(state => {
                state.services = res.data
                state.filteredServices = res.data
                    .filter((item) => item.status === 'Ended')
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "serviceArchiveModalStore",
    version: 1
})*/);

export default useServiceArchiveModal;
