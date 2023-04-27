import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {
    EnumServiceStatus,
    LocalStorage,
    ServiceAPI,
    ServiceWithData,
    UpdateServiceStatus,
    User
} from '../../../entities'
import {ErrorStatusTypes} from '../../../entities/enumerables/ErrorStatusTypes'

export type ServiceListStatusType = 'Waiting' | 'InProcess' | 'Ready'

interface ServiceStore {
    isLoading: boolean
    errorStatus: ErrorStatusTypes
    isCreating: boolean
    setIsCreating: (value: boolean) => void

    currentService: ServiceWithData | null
    setCurrentService: (service: ServiceWithData | null) => void
    serviceListStatus: string,
    setServiceListStatus: (serviceListStatus: string) => void
    services: ServiceWithData[]
    setServices: (services: ServiceWithData[]) => void
    filteredServices: ServiceWithData[]
    setFilteredServices: (filteredServices: ServiceWithData[]) => void

    masters: User[]
    getMasters: () => void

    getAllServicesInfo: () => any
    addNewService: (data: ServiceWithData) => any
    updateService: (updateData: ServiceWithData, onSuccess: () => void) => any
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
                        item.service.status === 'Waiting' || item.service.status === 'WaitingSupply')
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
                    serv.service.status === 'Waiting' || serv.service.status === 'WaitingSupply')
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
    updateService: (updateData, onSuccess) => {
        set({isLoading: true})
        let data = {...updateData, ...updateData.service, userId: LocalStorage.userId(), service: "nope"}
        console.log('sendingToServerUpdate', data)
        ServiceAPI.updateService(data).then((res) => {
            set(state => {
                state.services = state.services.map((ser) => {
                    if (ser.service.id === res.data.service.id)
                        return (res.data)
                    else return (ser)
                })
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
    updateServiceStatus: (data: UpdateServiceStatus, onSuccess) => {
        set({isLoading: true})
        ServiceAPI.updateServiceStatus(data).then((res: any) => {
            const currentListStatus = useService.getState().serviceListStatus

            if (currentListStatus) {
                set(state => {
                    state.services.filter(serv => serv.service.id === data.id)[0].service.status = data.status
                })
                // надо сделать универсальную функцию?
                if (currentListStatus === 'Waiting') {
                    set(state => {
                        state.filteredServices = state.services.filter(serv =>
                            serv.service.status === 'Waiting' || serv.service.status === 'WaitingSupply')
                    })
                } else {
                    set(state => {
                        state.filteredServices = state.services.filter(serv =>
                            serv.service.status === currentListStatus)
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