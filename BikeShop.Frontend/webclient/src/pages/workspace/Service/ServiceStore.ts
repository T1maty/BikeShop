import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {
    EnumServiceStatus,
    LocalStorage,
    PaymentData,
    ServiceAPI,
    ServiceFormModel,
    ServiceWithData,
    UpdateServiceStatus,
    User
} from '../../../entities'
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


    endService: (id: number, paymentData: PaymentData, onSuccess: () => void) => void

    printModalSticker: boolean
    setPrintModalSticker: (v: boolean) => void
    triggerSticker: "agent" | null
    setTriggerSticker: (v: "agent" | null) => void

    printModalIn: boolean
    setPrintModalIn: (v: boolean) => void
    triggerIn: "agent" | null
    setTriggerIn: (v: "agent" | null) => void

    printModalOut: boolean
    setPrintModalOut: (v: boolean) => void
    triggerOut: "agent" | null
    setTriggerOut: (v: "agent" | null) => void

    printModalOutSmall: boolean
    setPrintModalOutSmall: (v: boolean) => void
    triggerOutSmall: "agent" | null
    setTriggerOutSmall: (v: "agent" | null) => void
}

const useService = create<ServiceStore>()(persist(devtools(immer((set, get) => ({
    triggerSticker: null,
    printModalSticker: false,
    setTriggerSticker: (v) => {
        set({triggerSticker: v})
    },
    setPrintModalSticker: (v) => {
        set({printModalSticker: v})
    },

    triggerIn: null,
    printModalIn: false,
    setTriggerIn: (v) => {
        set({triggerIn: v})
    },
    setPrintModalIn: (v) => {
        set({printModalIn: v})
    },

    triggerOut: null,
    printModalOut: false,
    setTriggerOut: (v) => {
        set({triggerOut: v})
    },
    setPrintModalOut: (v) => {
        set({printModalOut: v})
    },

    triggerOutSmall: null,
    printModalOutSmall: false,
    setTriggerOutSmall: (v) => {
        set({triggerOutSmall: v})
    },
    setPrintModalOutSmall: (v) => {
        set({printModalOutSmall: v})
    },


    endService: (id, pd, s) => {
        set({isLoading: true})
        ServiceAPI.endService(id, pd.cash, pd.bankCount, pd.card, pd.personalBalance, pd.isFiscal).then((g) => {
            let newData = get().services.map((i) => {
                if (i.service.id === g.data.service.id) return g.data
                return i
            })
            get().setServices(newData)
            get().filter()
            get().setPrintModalOut(true)
            get().setTriggerOut('agent')
            setTimeout(() => {
                get().setPrintModalOutSmall(true)
                get().setTriggerOutSmall('agent')
            }, 1000)
            s()
        }).catch(() => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
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
                    item.service.status === get().serviceListStatus)
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
            set({serviceListStatus: EnumServiceStatus.Waiting})
            get().filter()
            set({isCreating: false})
            set(state => {
                state.currentService = state.services[state.services.length - 1]
            })

            get().setPrintModalIn(true)
            get().setTriggerIn('agent')

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
}))), {
    name: "serviceStore",
    version: 1
}));

export default useService;