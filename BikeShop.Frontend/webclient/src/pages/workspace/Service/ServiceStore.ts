import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {$api} from '../../../shared';
import {
    CreateService,
    CreateServiceResponse,
    GetUsersResponse,
    IProductExtended,
    IUser,
    ServiceItem,
    UpdateService,
    UpdateServiceStatus,
    UserResponse
} from '../../../entities';
import {ServiceProduct, ServiceWork} from '../../../entities/requests/CreateService';

export type ServiceListStatusType = 'Waiting' | 'InProcess' | 'Ready'

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    isClientChosen: boolean
    setIsClientChosen: (value: boolean) => void
    isServiceItemChosen: boolean
    setIsServiceItemChosen: (value: boolean) => void

    currentUser: IUser | null
    setCurrentUser: (user: IUser | null) => void
    currentMasterId: string
    setCurrentMasterId: (userMasterId: string) => void
    currentService: ServiceItem | null
    setCurrentService: (service: ServiceItem | null) => void

    users: IUser[]
    masters: UserResponse[]
    getMasters: () => any // надо исправить тип
    services: ServiceItem[]
    setServices: (services: ServiceItem[]) => void
    filteredServices: ServiceItem[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void
    serviceListStatus: ServiceListStatusType
    setServiceListStatus: (serviceListStatus: ServiceListStatusType) => void
    currentProducts: ServiceProduct[]
    setCurrentProducts: (products: ServiceProduct[]) => void
    currentWorks: ServiceWork[]
    setCurrentWorks: (works: ServiceWork[]) => void

    getAllServicesInfo: () => any // надо исправить тип
    addNewService: (data: CreateService) => any // Promise<AxiosResponse<CreateServiceResponse>>
    updateService: (updateData: UpdateService) => any // надо исправить тип
    updateServiceStatus: (data: UpdateServiceStatus) => void

    products: IProductExtended[]
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),
    isClientChosen: false,
    setIsClientChosen: (value) => set({isClientChosen: value}),
    isServiceItemChosen: false,
    setIsServiceItemChosen: (value) => set({isServiceItemChosen: value}),

    currentUser: null,
    setCurrentUser: (user) => set({currentUser: user}),
    currentMasterId: '',
    setCurrentMasterId: (userMasterId) => set({currentMasterId: userMasterId}),
    currentService: null,
    setCurrentService: (service) => set({currentService: service}),

    users: [],
    masters: [],
    getMasters: () => {
        return $api.get<GetUsersResponse>('/user/find').then(res => {
            set(state => {
                state.masters = res.data.users.filter((m: UserResponse) => m.user.shopId === 0)
                console.log('все мастер', state.masters)
            })
        })
    },
    services: [],
    setServices: (services) => set(state => {
        state.services = services
    }),
    filteredServices: [],
    setFilteredServices: (filteredServices) => set(state => {
        state.filteredServices = filteredServices
    }),
    serviceListStatus: 'Waiting',
    setServiceListStatus: (serviceListStatus) => set({serviceListStatus: serviceListStatus}),
    currentProducts: [],
    setCurrentProducts: (products) => set(state => {
        state.currentProducts = products
    }),
    currentWorks: [],
    setCurrentWorks: (works) => set(state => {
        state.currentWorks = works
    }),

    getAllServicesInfo: () => {
        set({isLoading: true})

        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                state.services = res.data
                state.filteredServices = res.data
                    .filter((item: CreateServiceResponse) =>
                        item.status === 'Waiting' || item.status === 'WaitingSupply')
                state.users = res.data.map((item: CreateServiceResponse) => item.client)

                console.log('все сервисы', state.services)
                console.log('отфильтрованные сервисы - ожидание', state.filteredServices)
                console.log('все юзеры из сервиса', state.users)
            })
            set({isLoading: false})
        })
    },
    addNewService: (data: CreateService) => {
        set({isLoading: true})
        set({isClientChosen: false})
        set({isServiceItemChosen: false})

        return $api.post('/service/create', data).then(res => {
            set(state => {
                state.services.push(res.data)
            })
            set(state => {
                state.filteredServices = state.services.filter(serv =>
                    serv.status === 'Waiting' || serv.status === 'WaitingSupply')
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('service not created', error)
        })
    },
    updateService: (updateData: UpdateService) => {
        set({isLoading: true})
        set({isClientChosen: false})
        set({isServiceItemChosen: false})

        return $api.put('/service/updateservice', updateData).then(res => {
            $api.get('/service/getbyshopid/1').then(res => {
                const currentListStatus = useService.getState().serviceListStatus

                set(state => {
                    state.services = res.data
                })
                // надо сделать универсальную функцию?
                if (currentListStatus === 'Waiting') {
                    set(state => {
                        state.filteredServices = state.services.filter(serv =>
                            serv.status === 'Waiting' || serv.status === 'WaitingSupply')
                    })
                } else {
                    set(state => {
                        state.filteredServices = state.services.filter(serv =>
                            serv.status === currentListStatus)
                    })
                }
                set({isLoading: false})
            })
        }).catch((error: any) => {
            console.log('service not updated', error)
        })
    },
    updateServiceStatus: (data: UpdateServiceStatus) => {
        set({isLoading: true})

        return $api.put(`/service/updateservicestatus?id=${data.id}&status=${data.status}`)
            .then(res => {
                const currentListStatus = useService.getState().serviceListStatus

                if (currentListStatus) {
                    set(state => {
                        state.services.filter(serv => serv.id === data.id)[0].status = data.status
                    })
                    // надо сделать универсальную функцию?
                    if (currentListStatus === 'Waiting') {
                        set(state => {
                            state.filteredServices = state.services.filter(serv =>
                                serv.status === 'Waiting' || serv.status === 'WaitingSupply')
                        })
                    } else {
                        set(state => {
                            state.filteredServices = state.services.filter(serv =>
                                serv.status === currentListStatus)
                        })
                    }
                }
                set({isLoading: false})
            }).catch((error: any) => {
                console.log('service status not updated', error)
            })
    },
    products: [],
})))/*, {
    name: "serviceStore",
    version: 1
})*/);

export default useService;