import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes";
import {ServiceAPI, ServiceWithData} from "../../../entities";

interface CheckArchiveModalStore {
    openCheckArchiveModal: boolean
    setOpenCheckArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: ServiceWithData[]
    getEndedServices: () => any // надо исправить тип
}

const useCheckArchiveModal = create<CheckArchiveModalStore>()(persist(devtools(immer((set) => ({
    openCheckArchiveModal: false,
    setOpenCheckArchiveModal: (value) => set(
        {openCheckArchiveModal: value}),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    // заглушка
    getEndedServices: () => {
        set({isLoading: true});
        return ServiceAPI.getAllServicesInfo().then(res => {
            set(state => {
                state.archive = res.data
                    .filter((item) => item.service.status === 'Ended')
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

}))), {
    name: "checkArchiveModalStore",
    version: 1
}));

export default useCheckArchiveModal;