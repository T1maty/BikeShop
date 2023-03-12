import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {$api} from '../../../shared';
import {
    CreateService,
    EnumServiceStatus,
    GetUsersResponse,
    IUser,
    ServiceItem,
    UpdateServiceStatus
} from '../../../entities';

export type ServiceListStatusType = 'Waiting' | 'InProcess' | 'Ready'

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    currentService: ServiceItem | null
    setCurrentService: (service: ServiceItem | null) => void

    masters: IUser[]
    getMasters: () => void

    services: ServiceItem[]
    setServices: (services: ServiceItem[]) => void
    filteredServices: ServiceItem[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void

    getAllServicesInfo: () => any // надо исправить тип
    addNewService: (data: CreateService) => any // Promise<AxiosResponse<CreateServiceResponse>>
    updateService: (updateData: CreateService) => any // надо исправить тип
    updateServiceStatus: (data: UpdateServiceStatus) => void

    serviceListStatus: string,
    setServiceListStatus: (serviceListStatus: string) => void
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),

    serviceListStatus: EnumServiceStatus.Waiting,
    setServiceListStatus: (serviceListStatus) => {
        set({serviceListStatus: serviceListStatus})
    },

    currentService: null,
    setCurrentService: (service) => {
        set({currentService: service})
    },

    masters: [],
    getMasters: () => {
        return $api.get<GetUsersResponse>('/user/find').then(res => {

            console.log(res.data)
            let users = res.data.users.map(n => {
                if (n.user.shopId != 0) return n.user
            })

            set(state => {
                // @ts-ignore
                state.masters = users.filter(n => n != undefined)
                console.log('все мастера', state.masters)
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

    getAllServicesInfo: () => {
        set({isLoading: true})

        return $api.get<ServiceItem[]>('/service/getbyshopid/1').then(res => {
            set(state => {
                state.services = res.data
                state.filteredServices = res.data
                    .filter((item) =>
                        item.status === 'Waiting' || item.status === 'WaitingSupply')
            })
            set({isLoading: false})
        })
    },

    addNewService: (data: CreateService) => {
        return $api.post('/service/create', data).then(res => {
            set(state => {
                state.services.push(res.data)
            })
            set(state => {
                state.filteredServices = state.services.filter(serv =>
                    serv.status === 'Waiting' || serv.status === 'WaitingSupply')
            })
            set({isLoading: false})
            set({currentService: res.data})
        }).catch((error: any) => {
            console.log('service not created', error)
        })
    },

    updateService: (updateData) => {
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
})))/*, {
    name: "serviceStore",
    version: 1
})*/);

export default useService;