import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {CreateService, EnumServiceStatus, ServiceAPI, ServiceItem, UpdateServiceStatus, User} from '../../../entities'
import {ErrorStatusTypes} from '../../../entities/enumerables/ErrorStatusTypes'

export type ServiceListStatusType = 'Waiting' | 'InProcess' | 'Ready'

interface ServiceStore {
    isLoading: boolean
    errorStatus: ErrorStatusTypes
    isCreating: boolean
    setIsCreating: (value: boolean) => void

    currentService: ServiceItem | null
    setCurrentService: (service: ServiceItem | null) => void
    serviceListStatus: string,
    setServiceListStatus: (serviceListStatus: string) => void
    services: ServiceItem[]
    setServices: (services: ServiceItem[]) => void
    filteredServices: ServiceItem[]
    setFilteredServices: (filteredServices: ServiceItem[]) => void

    masters: User[]
    getMasters: () => void

    getAllServicesInfo: () => any
    addNewService: (data: CreateService) => any
    updateService: (updateData: CreateService) => any
    updateServiceStatus: (data: UpdateServiceStatus, onSuccess: () => void) => void
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    errorStatus: 'default',
    isCreating: false,
    setIsCreating: (value) => {
        set({isCreating: value})
    },

    currentService: null,
    setCurrentService: (service) => {
        set({currentService: service})
    },
    serviceListStatus: EnumServiceStatus.Waiting,
    setServiceListStatus: (serviceListStatus) => {
        set({serviceListStatus: serviceListStatus})
    },
    services: [],
    setServices: (services) => set(state => {
        state.services = services
    }),
    filteredServices: [],
    setFilteredServices: (filteredServices) => set(state => {
        state.filteredServices = filteredServices
    }),

    masters: [],
    getMasters: () => {
        set({isLoading: true})
        ServiceAPI.getMasters().then((res: any) => {

            console.log('мастера в сервисе', res.data)

            let users = res.data.users.map((n: any) => {
                if (n.user.shopId != 0) return n.user
            })

            set(state => {
                // @ts-ignore
                state.masters = users.filter(n => n !== undefined)
                console.log('все мастера', state.masters)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    getAllServicesInfo: () => {
        set({isLoading: true})
        ServiceAPI.getAllServicesInfo().then(res => {
            console.log('все ремонты', res.data)
            set(state => {
                state.services = res.data
                state.filteredServices = res.data
                    .filter((item) =>
                        item.status === 'Waiting' || item.status === 'WaitingSupply')
            })
            set({isLoading: false})
            set({isCreating: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    addNewService: (data) => {
        set({isLoading: true})
        ServiceAPI.addNewService(data).then((res: any) => {
            set(state => {
                state.services.push(res.data)
            })
            set(state => {
                state.filteredServices = state.services.filter(serv =>
                    serv.status === 'Waiting' || serv.status === 'WaitingSupply')
            })
            set({currentService: res.data})
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    updateService: (updateData) => {
        set({isLoading: true})
        ServiceAPI.updateService(updateData).then((res: any) => {
            ServiceAPI.getAllServicesInfo().then(res => {
                const currentListStatus = useService.getState().serviceListStatus

                set(state => {
                    state.services = res.data
                })

                // надо сделать универсальную функцию ?!
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
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    updateServiceStatus: (data: UpdateServiceStatus, onSuccess) => {
        set({isLoading: true})
        ServiceAPI.updateServiceStatus(data).then((res: any) => {
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

            onSuccess();
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "serviceStore",
    version: 1
})*/);

export default useService;