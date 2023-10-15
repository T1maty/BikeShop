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

export type ServiceListStatusType = 'Waiting' | 'InProcess' | 'Ready'

interface ServiceStore {
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
    addNewService: (data: ServiceFormModel, onSuccess: (Id: number) => void) => any
    updateService: (updateData: ServiceFormModel, onSuccess: () => void) => any
    updateServiceStatus: (data: UpdateServiceStatus, onSuccess: () => void) => void

    selectedNavService: ServiceWithData | null,
    setSelectedNavService: (v: ServiceWithData) => void,


    endService: (id: number, paymentData: PaymentData, onSuccess: (Id: number) => void) => void

    printModalSticker: boolean
    setPrintModalSticker: (v: boolean) => void

    printModalIn: boolean
    setPrintModalIn: (v: boolean) => void

    printModalOut: boolean
    setPrintModalOut: (v: boolean) => void

    printModalOutSmall: boolean
    setPrintModalOutSmall: (v: boolean) => void

    isPrinting: boolean
    setIsPrinting: (v: boolean) => void


}

const useService = create<ServiceStore>()(persist(devtools(immer((set, get) => ({
    isPrinting: false,
    setIsPrinting: (v) => {
        set({isPrinting: v})
    },
    printModalSticker: false,
    setPrintModalSticker: (v) => {
        set({printModalSticker: v})
    },

    printModalIn: false,
    setPrintModalIn: (v) => {
        set({printModalIn: v})
    },

    printModalOut: false,
    setPrintModalOut: (v) => {
        set({printModalOut: v})
    },

    printModalOutSmall: false,
    setPrintModalOutSmall: (v) => {
        set({printModalOutSmall: v})
    },


    endService: (id, pd, s) => {
        ServiceAPI.endService(id, pd.cash, pd.bankCount, pd.card, pd.personalBalance, pd.isFiscal).then((g) => {
            let newData = get().services.map((i) => {
                if (i.service.id === g.data.service.id) return g.data
                return i
            })
            get().setServices(newData)
            get().filter()
            s(g.data.service.id)
        })
    },

    errorStatus: 'default',

    isCreating: false,
    setIsCreating: (value) => {
        set({isCreating: value})
    },

    masters: [],
    getMasters: () => {
        ServiceAPI.getMasters().then((res: any) => {

            console.log('мастера в сервисе', res.data)

            let users = res.data.users.map((n: any) => {
                if (n.user.shopId != 0) return n.user
            })

            set(state => {
                state.masters = users.filter((n: any) => n !== undefined)
                console.log('все мастера', state.masters)
            })
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
        ServiceAPI.getAllServicesInfo().then(res => {
            console.log('все ремонты', res.data)
            set(state => {
                state.services = res.data
            })
            get().filter()
            set({isCreating: false})
        })
    },
    addNewService: (data, onSuccess) => {
        data.userId = LocalStorage.userId()!
        data.shopId = parseInt(LocalStorage.shopId()!)

        ServiceAPI.addNewService(data).then((res) => {
            set(state => {
                state.services.push(res.data)
            })
            set({serviceListStatus: EnumServiceStatus.Waiting})
            get().filter()
            set({isCreating: false})
            set(state => {
                state.currentService = state.services[state.services.length - 1]
            })

            onSuccess(res.data.service.id);
        })
    },
    updateService: (updateData, onSuccess) => {
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
        })
    },
    updateServiceStatus: (data: UpdateServiceStatus, onSuccess) => {
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