import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {ServiceItem} from "../../../entities/responses/ServiceItem";
import {$api} from "../../../shared";
import {IUser, UpdateService, UpdateServiceStatus} from "../../../entities";
import {CreateNewService, CreateService} from "../../../entities/requests/CreateService";

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    user: IUser
    setUser: (user: IUser) => void
    services: ServiceItem[]
    getAllServices: () => any // надо исправить тип
    filteredServices: ServiceItem[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void
    getFilteredServices: () => any // надо исправить тип
    addNewService: (data: CreateNewService) => any // надо исправить тип
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

    addNewService: (data: CreateNewService) => {
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