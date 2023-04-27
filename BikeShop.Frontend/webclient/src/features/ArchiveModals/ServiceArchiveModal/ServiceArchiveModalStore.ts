import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {ServiceAPI, ServiceWithData} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes";

interface ServiceArchiveModalStore {
    openServiceArchiveModal: boolean
    setOpenServiceArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    currentService: ServiceWithData | null
    setCurrentService: (service: ServiceWithData | null) => void
    services: ServiceWithData[]
    setServices: (services: ServiceWithData[]) => void
    filteredServices: ServiceWithData[]
    setFilteredServices: (filteredServices: ServiceWithData[]) => void

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
    setServices: (services) => set(state => {
        state.services = services
    }),
    filteredServices: [],
    setFilteredServices: (filteredServices) => set(state => {
        state.filteredServices = filteredServices
    }),

    getAllServicesInfo: () => {
        set({isLoading: true});
        return ServiceAPI.getAllServicesInfo().then(res => {
            set(state => {
                state.services = res.data
                state.filteredServices = res.data
                    .filter((item) => item.service.status === 'Ended')
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
