import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {ServiceAPI, ServiceItem} from '../../../entities'

interface ServiceFinalArchiveModalStore {
    openServiceFinalArchiveModal: boolean
    setOpenServiceFinalArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: ServiceItem[]
    getEndedServices: () => any // надо исправить тип
}

const useServiceFinalArchiveModal = create<ServiceFinalArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openServiceFinalArchiveModal: false,
    setOpenServiceFinalArchiveModal: (value: boolean) => set({
        openServiceFinalArchiveModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    getEndedServices: () => {
        set({isLoading: true});
        return ServiceAPI.getAllServicesInfo().then(res => {
            set(state => {
                state.archive = res.data
                    .filter((item) => item.status === 'Ended')
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "serviceFinalArchiveModalStore",
    version: 1
})*/);

export default useServiceFinalArchiveModal;