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
    // setNewService: (service: CreateService) => void
    getAllServices: () => any // надо исправить тип
    filteredServices: ServiceItem[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void
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
    // setNewService: (newService: CreateService) => set(state => {
    //     // @ts-ignore
    //     state.services.push(newService);
    // }),
    // получение всех сервисов и фильтрация списка ожидания
    getAllServices: () => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.services = [...res.data]
                state.filteredServices = [...res.data].filter((item: any) => item.status === 'Waiting' || item.status === 'WaitingSupply')
            })
            set({isLoading: false})
        })
    },

    filteredServices: [],
    setFilteredServices: (filteredServices: ServiceItem[]) => set(state => {
        state.filteredServices = [...filteredServices]
    }),

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