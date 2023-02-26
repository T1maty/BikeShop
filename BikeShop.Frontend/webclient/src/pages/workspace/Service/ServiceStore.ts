import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {$api} from "../../../shared";
import {
    CreateService,
    CreateServiceResponse,
    IUser,
    ServiceItem,
    UpdateService,
    UpdateServiceStatus
} from '../../../entities';
import {ServiceProduct, ServiceWork} from "../../../entities/requests/CreateService";
import {UpdateServiceResponse} from '../../../entities/responses/UpdateServiceResponse';
import {GetServicesResponse} from "../../../entities/responses/GetServicesResponse";

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    currentUser: IUser
    setCurrentUser: (user: IUser | undefined) => void // надо исправить тип
    currentService: ServiceItem
    setCurrentService: (service: ServiceItem | undefined) => void // надо исправить тип

    users: IUser[],
    services: ServiceItem[]
    filteredServices: ServiceItem[]
    products: ServiceProduct[]
    works: ServiceWork[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void

    getAllServicesInfo: () => any // надо исправить тип
    addNewService: (data: CreateService) => Promise<AxiosResponse<CreateServiceResponse>>
    updateService: (data: UpdateService) => Promise<AxiosResponse<UpdateServiceResponse>>
    updateServiceStatus: (data: UpdateServiceStatus) => void
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),
    currentUser: {} as IUser,
    setCurrentUser: (user: IUser | undefined) => set({
        currentUser: user // надо исправить тип
    }),
    currentService: {} as ServiceItem,
    setCurrentService: (service: ServiceItem | undefined) => set({
        currentService: service // надо исправить тип
    }),

    users: [],
    services: [],
    filteredServices: [],
    products: [],
    works: [],
    setFilteredServices: (filteredServices: ServiceItem[]) => set(state => {
        state.filteredServices = filteredServices
    }),

    getAllServicesInfo: () => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.services = res.data
                state.filteredServices = res.data
                    .filter((item: CreateServiceResponse) => item.status === 'Waiting' || item.status === 'WaitingSupply')
                state.users = res.data.map((item: CreateServiceResponse) => item.client)
                // state.products = [...res.data.products]
                // state.works = [...res.data.works]

                console.log('все сервисы', state.services)
                console.log('отфильтрованные сервисы - ожидание', state.filteredServices)
                console.log('все юзеры из сервиса', state.users)
                console.log('продукты', state.products)
                console.log('работы', state.works)
            })
            set({isLoading: false})
        })
    },
    addNewService: (data: CreateService) => {
        return $api.post<CreateServiceResponse>('/service/create', data)
    },
    updateService: (data: UpdateService) => {
        return $api.put<UpdateServiceResponse>('/service/updateservice', data)
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