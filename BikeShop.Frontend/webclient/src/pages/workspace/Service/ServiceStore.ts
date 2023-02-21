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
    filterServices: (filteredServices: ServiceItem[]) => void
    getAllServices: () => any // надо исправить тип

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
    filterServices: (filteredServices: ServiceItem[]) => set({
        services: filteredServices
    }),
    getAllServices: () => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                // state.services.unshift(...res.data.users)
                state.services = [...res.data]
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