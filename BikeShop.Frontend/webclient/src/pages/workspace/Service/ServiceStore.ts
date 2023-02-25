import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {$api} from "../../../shared";
import {CreateService, IUser, ServiceItem, UpdateService, UpdateServiceStatus} from "../../../entities";

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    currentUser: IUser
    setCurrentUser: (user: any) => void
    currentService: ServiceItem
    setCurrentService: (service: ServiceItem | undefined) => void // исправить тип?

    users: any[],
    getAllUsersFromServices: () => void // надо исправить тип
    services: ServiceItem[]
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
    currentUser: {} as IUser,
    setCurrentUser: (user: any) => set({
        currentUser: user
    }),
    currentService: {} as ServiceItem,
    setCurrentService: (service: ServiceItem | undefined) => set({
        currentService: service // исправить тип?
    }),

    users: [],
    getAllUsersFromServices: () => {
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.users = res.data.map((s: any) => s.client)
            })
        })
    },
    services: [],
    getAllServices: () => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.services = res.data
                state.filteredServices = res.data
                    .filter((item: any) => item.status === 'Waiting' || item.status === 'WaitingSupply')
            })
            set({isLoading: false})
        })
    },
    filteredServices: [],
    setFilteredServices: (filteredServices: ServiceItem[]) => set(state => {
        state.filteredServices = filteredServices
    }),

    addNewService: (data: CreateService) => {
        return $api.post('/service/create', data)
    },
    updateService: (data: UpdateService) => {
        return $api.put('/service/updateservice', data)
    },
    updateServiceStatus: (data: UpdateServiceStatus) => {
        return $api.put('/service/updateservicestatus', data).then(res => {
            // зарефакторить
            set(state => {state.services.filter(serv =>
                serv.id === data.serviceId)[0].status = 'InProcess'}) // data.newStatus.toString()
            set(state => {state.filteredServices = state.services.filter(serv =>
                serv.status === 'Waiting' || serv.status === 'WaitingSupply')})
        })
    },
})))/*, {
    name: "serviceStore",
    version: 1
})*/);

export default useService;