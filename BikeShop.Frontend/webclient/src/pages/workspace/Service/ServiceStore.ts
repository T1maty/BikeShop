import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {LocalStorage, ServiceAPI, ServiceFormModel, ServiceWithData, UpdateServiceStatus, User} from '../../../entities'
import {ErrorStatusTypes} from '../../../entities/enumerables/ErrorStatusTypes'

export type ServiceListStatusType = 'Waiting' | 'InProcess' | 'Ready'

interface ServiceStore {
    errorStatus: ErrorStatusTypes
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    isCreating: boolean
    setIsCreating: (value: boolean) => void

    masters: User[]
    getMasters: () => void

    currentService: ServiceWithData | null
    setCurrentService: (service: ServiceWithData | null) => void
    serviceListStatus: string
    setServiceListStatus: (serviceListStatus: string) => void
    services: ServiceWithData[]
    setServices: (services: ServiceWithData[]) => void
    filteredServices: ServiceWithData[]
    setFilteredServices: (filteredServices: ServiceWithData[]) => void
    filter: () => void

    getAllServicesInfo: () => any
    addNewService: (data: ServiceFormModel, onSuccess: () => void) => any
    updateService: (updateData: ServiceFormModel, onSuccess: () => void) => any
    updateServiceStatus: (data: UpdateServiceStatus, onSuccess: () => void) => void

    selectedNavService: ServiceWithData | null,
    setSelectedNavService: (v: ServiceWithData) => void,

    printModal: boolean
    setPrintModal: (v: boolean) => void
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set, get) => ({
    printModal: false,
    setPrintModal: (v) => {
        set({printModal: v})
    },
    errorStatus: 'default',
    isLoading: false,
    setIsLoading: (value) => {
        set({isLoading: value})
    },
    isCreating: false,
    setIsCreating: (value) => {
        set({isCreating: value})
    },

    masters: [],
    getMasters: () => {
        set({isLoading: true})
        ServiceAPI.getMasters().then((res: any) => {

            console.log('мастера в сервисе', res.data)

            let users = res.data.users.map((n: any) => {
                if (n.user.shopId != 0) return n.user
            })

            set(state => {
                state.masters = users.filter((n: any) => n !== undefined)
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

    currentService: null,
    setCurrentService: (service) => {
        set({isCreating: false})
        set({currentService: service})
    },
    serviceListStatus: "Waiting",
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
    filter: () => {
        set(state => {
            state.filteredServices = state.services
                .filter((item) =>
                    item.service.status === 'Waiting' || item.service.status === 'WaitingSupply')
        })
    },

    getAllServicesInfo: () => {
        set({isLoading: true})
        ServiceAPI.getAllServicesInfo().then(res => {
            console.log('все ремонты', res.data)
            set(state => {
                state.services = res.data
            })
            get().filter()
            set({isLoading: false})
            set({isCreating: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    addNewService: (data, onSuccess) => {
        set({isLoading: true})
        data.userId = LocalStorage.userId()!
        data.shopId = parseInt(LocalStorage.shopId()!)

        ServiceAPI.addNewService(data).then((res: any) => {
            set(state => {
                state.services.push(res.data)
            })
            get().filter()
            set({isCreating: false})
            set(state => {
                state.currentService = state.services[state.services.length - 1]
            })
            onSuccess();
            set({isLoading: false})
        }).catch((error: any) => {
            console.log(error)
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    updateService: (updateData, onSuccess) => {
        set({isLoading: true})
        updateData.userId = LocalStorage.userId()!
        console.log('sendingToServerUpdate', updateData)
        ServiceAPI.updateService(updateData).then((res) => {
            let newArchive = get().services.map((ser) => {
                if (ser.service.id === res.data.service.id) {
                    return ({...res.data})
                } else return (ser)
            })
            set({services: newArchive})
            set({serviceListStatus: 'Waiting'})
            get().filter()
            set({currentService: res.data})
            onSuccess()
            set({isLoading: false})
        }).catch((error: any) => {
            console.log(error)
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

            onSuccess()
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    selectedNavService: null,
    setSelectedNavService: (v) => {
        set({selectedNavService: v})
    }
})))/*, {
    name: "serviceStore",
    version: 1
})*/);

export default useService;