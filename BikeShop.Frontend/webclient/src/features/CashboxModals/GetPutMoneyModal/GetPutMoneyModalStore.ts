import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CashboxActionRequest, CashboxAPI} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"

interface GetPutMoneyModalStore {
    openGetPutMoneyModal: boolean
    setOpenGetPutMoneyModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes
    createCashbox: (data: CashboxActionRequest) => any
}

const useGetPutMoneyModal = create<GetPutMoneyModalStore>()(persist(devtools(immer((set) => ({
    openGetPutMoneyModal: false,
    setOpenGetPutMoneyModal: (value) => set({openGetPutMoneyModal: value}),
    isLoading: false,
    errorStatus: 'default',

    createCashbox: (data) => {
        set({isLoading: true})
        CashboxAPI.createCashbox(data).then((res: any) => {
            set({isLoading: false})
            set({errorStatus: 'success'})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
}))), {
    name: "getPutMoneyModalStore",
    version: 1
}));

export default useGetPutMoneyModal;