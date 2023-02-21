import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {ServiceItem} from "../../../entities/responses/ServiceItem";
import {$api} from "../../../shared";
import {IUser} from "../../../entities";
import {CreateService} from "../../../entities/requests/CreateService";
import {ServiceStatusType} from "./Service";

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    user: IUser
    setUser: (user: IUser) => void

    services: ServiceItem[]
    getAllServices: () => any // надо исправить тип
    getFilteredServices: () => any // надо исправить тип
    filteredServices: ServiceItem[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void

    addNewService: (data: any) => any // надо исправить тип
    // updateService: (data: any) => any // надо исправить тип
}

export interface updateServiceStatus {
    serviceId: number
    newStatus: number
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

    services: [],
    getAllServices: () => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.services = [...res.data] // рабочий вариант
            })
            set({isLoading: false});
        })
    },
    filteredServices: [],
    setFilteredServices: (filteredServices: ServiceItem[]) => set({
        filteredServices: filteredServices
    }),
    getFilteredServices: () => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.filteredServices = [...res.data.filter((s: any) => s.status === 'Waiting')]
            })
            set({isLoading: false});
        })
    },

    addNewService: (data: CreateService) => {
        return $api.post('/service/create', data)
    },
    // updateService: (data: CreateService) => {
    //     return $api.put('/service/updateservice', data)
    // },
    // updateServiceStatus: (data: updateServiceStatus) => {
    //     return $api.put('/service/updateservicestatus', data)
    // },
})))/*, {
    name: "serviceStore",
    version: 1
})*/);

export default useService;