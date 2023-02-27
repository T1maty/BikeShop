import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {AxiosResponse} from 'axios';
import {$api} from '../../../shared';
import {CreateService, CreateServiceResponse, IUser,
    ServiceItem, UpdateService, UpdateServiceStatus} from '../../../entities';
import {ServiceProduct, ServiceWork} from '../../../entities/requests/CreateService';
import {UpdateServiceResponse} from '../../../entities/responses/UpdateServiceResponse';

export type ServiceListStatusType = 'Waiting' | 'InProcess' | 'Ready'

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    // currentUser: IUser
    currentUser: IUser | null
    setCurrentUser: (user: IUser | null) => void // надо исправить тип
    currentService: ServiceItem | null
    setCurrentService: (service: ServiceItem | null) => void

    users: IUser[]
    services: ServiceItem[]
    setServices: (services: ServiceItem[]) => void
    filteredServices: ServiceItem[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void
    serviceListStatus: ServiceListStatusType
    setServiceListStatus: (serviceListStatus: ServiceListStatusType) => any
    products: ServiceProduct[]
    works: ServiceWork[]

    getAllServicesInfo: () => any // надо исправить тип
    addNewService: (data: CreateService) => Promise<AxiosResponse<CreateServiceResponse>>
    updateService: (data: UpdateService) => Promise<AxiosResponse<UpdateServiceResponse>>
    // updateStatusHandler: (data: UpdateServiceStatus, serviceStatus: ServiceStatusType,
    //                       filteredStatus: ServiceStatusType, extraStatus?: ServiceStatusType) => void
    updateServiceStatus: (data: UpdateServiceStatus) => void
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),
    // currentUser: {} as IUser,
    currentUser: null,
    setCurrentUser: (user) => set({currentUser: user}),
    currentService: null,
    setCurrentService: (service) => set({currentService: service}),

    users: [],
    services: [],
    setServices: (services) => set(state => {state.services = services}),
    filteredServices: [],
    setFilteredServices: (filteredServices) => set(state => {state.filteredServices = filteredServices}),
    serviceListStatus: 'Waiting',
    setServiceListStatus: (serviceListStatus) => set({serviceListStatus: serviceListStatus}),
    // setServiceListStatus: (serviceListStatus) => set(state => {
    //     switch (serviceListStatus) {
    //         case 'Waiting':
    //             return state.filteredServices = state.services.filter(serv => serv.status === 'Waiting' || serv.status === 'WaitingSupply')
    //         case 'InProcess':
    //             return state.filteredServices = state.services.filter(serv => serv.status === 'InProcess')
    //         case 'Ready':
    //             return state.filteredServices = state.services.filter(serv => serv.status === 'Ready')
    //         default:
    //             return state.filteredServices
    //     }
    // }),
    products: [],
    works: [],

    getAllServicesInfo: () => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.services = res.data
                state.filteredServices = res.data
                    .filter((item: CreateServiceResponse) =>
                        item.status === 'Waiting' || item.status === 'WaitingSupply')
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
    // updateStatusHandler: (data, serviceStatus, filteredStatus, extraStatus) => {
    //     // ожидают
    //     if (/*data.status === 'InProcess' && */currentListStatus === 'Waiting') {
    //         set(state => {
    //             state.services.filter(serv => serv.id === data.id)[0].status = data.status
    //         })
    //         set(state => {
    //             state.filteredServices = state.services.filter(serv =>
    //                 serv.status === 'Waiting' || serv.status === 'WaitingSupply')
    //         })
    //     }
    // },
    updateServiceStatus: (data: UpdateServiceStatus) => {
        set({isLoading: true});
        return $api.put(`/service/updateservicestatus?id=${data.id}&status=${data.status}`)
            .then(res => {
                // текущий фильтр лист
                const currentListStatus = useService.getState().serviceListStatus
                // ожидают
                if (/*data.status === 'InProcess' && */currentListStatus === 'Waiting') {
                    set(state => {
                        state.services.filter(serv => serv.id === data.id)[0].status = data.status
                    })
                    set(state => {
                        state.filteredServices = state.services.filter(serv =>
                            serv.status === 'Waiting' || serv.status === 'WaitingSupply')
                    })
                }
                // в ремонте
                if (/*data.status === 'WaitingSupply' || data.status === 'Ready'*/currentListStatus === 'InProcess') {
                    set(state => {
                        state.services.filter(serv => serv.id === data.id)[0].status = data.status
                    })
                    set(state => {
                        state.filteredServices = state.services.filter(serv =>
                            serv.status === currentListStatus)
                    })
                }
                // готово
                if (/*(data.status === 'InProcess' || data.status === 'Ended') && */currentListStatus === 'Ready') {
                    set(state => {
                        state.services.filter(serv => serv.id === data.id)[0].status = data.status
                    })
                    set(state => {
                        state.filteredServices = state.services.filter(serv =>
                            serv.status === currentListStatus)
                    })
                }

                set({isLoading: false})
            })
    },
})))/*, {
    name: "serviceStore",
    version: 1
})*/);

export default useService;
