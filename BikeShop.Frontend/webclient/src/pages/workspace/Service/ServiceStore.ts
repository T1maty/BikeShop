import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {$api} from "../../../shared";
import {CreateService, IUser, ServiceItem, UpdateService, UpdateServiceStatus} from "../../../entities";

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    user: IUser
    setUser: (user: IUser) => void
    service: ServiceItem
    setService: (service: ServiceItem) => void
    services: ServiceItem[]
    getAllServices: () => any // надо исправить тип
    filteredServices: ServiceItem[]
    // setFilteredServices: (filteredServices: ServiceItem[]) => void
    getFilteredServices: (incomingStatus: string, extraStatus?: string) => any // надо исправить тип
    // getWaitingFilteredServices: () => any // надо исправить тип
    // getInProcessFilteredServices: () => any // надо исправить тип
    // getReadyFilteredServices: () => any // надо исправить тип

    addNewService: (data: CreateService) => any // надо исправить тип
    updateService: (data: UpdateService) => any // надо исправить тип
    updateServiceStatus: (data: UpdateServiceStatus) => any // надо исправить тип
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),
    user: {} as IUser,
    setUser: (user: IUser) => set({
        user: user
    }),
    service: {} as ServiceItem,
    setService: (service: ServiceItem) => set({
        service: service
    }),

    services: [],
    getAllServices: () => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.services = [...res.data]
            })
            set({isLoading: false});
        })
    },

    filteredServices: [],
    // setFilteredServices: (filteredServices: ServiceItem[]) => set({
    //     filteredServices: filteredServices
    // }),
    getFilteredServices: (incomingStatus: string, extraStatus?: string) => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.filteredServices = [...res.data.filter((s: ServiceItem) =>
                    s.status === incomingStatus || s.status === extraStatus
                )]
            })
            set({isLoading: false});
        })
    },

    // getWaitingFilteredServices: () => {
    //     set({isLoading: true});
    //     return $api.get('/service/getbyshopid/1').then(res => {
    //         set(state => {
    //             state.filteredServices = [...res.data.filter((s: ServiceItem) =>
    //                 s.status === 'Waiting' || s.status === 'WaitingSupply'
    //             )]
    //         })
    //         set({isLoading: false});
    //     })
    // },
    // getInProcessFilteredServices: () => {
    //     set({isLoading: true});
    //     return $api.get('/service/getbyshopid/1').then(res => {
    //         set(state => {
    //             state.filteredServices = [...res.data.filter((s: ServiceItem) =>
    //                 s.status === 'InProcess'
    //             )]
    //         })
    //         set({isLoading: false});
    //     })
    // },
    // getReadyFilteredServices: () => {
    //     set({isLoading: true});
    //     return $api.get('/service/getbyshopid/1').then(res => {
    //         set(state => {
    //             state.filteredServices = [...res.data.filter((s: ServiceItem) =>
    //                 s.status === 'Ready'
    //             )]
    //         })
    //         set({isLoading: false});
    //     })
    // },

    addNewService: (data: CreateService) => {
        return $api.post('/service/create', data)
    },
    updateService: (data: UpdateService) => {
        return $api.put('/service/updateservice', data)
    },
    updateServiceStatus: (data: UpdateServiceStatus) => {
        return $api.put('/service/updateservicestatus', data)
    },
})))/*, {
    name: "serviceStore",
    version: 1
})*/);

export default useService;