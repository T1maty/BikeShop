import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../entities/enumerables/ErrorStatusTypes"

interface EmployeeSalaryModalStore {
    openEmployeeSalaryModal: boolean
    setOpenEmployeeSalaryModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    currentEmployee: any | null
    setCurrentEmployee: (employee: any | null) => void
    getEmployeeInfo: () => void
}

const useEmployeeSalaryModal = create<EmployeeSalaryModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openEmployeeSalaryModal: false,
    setOpenEmployeeSalaryModal: (value: boolean) => set({
        openEmployeeSalaryModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    currentEmployee: null,
    setCurrentEmployee: (employee) => {
        set({currentEmployee: employee})
    },
    getEmployeeInfo: () => {
        // set({isLoading: true})
        // ArchiveAPI.getArchive().then((res: any) => {
        //     set(state => {
        //         state.employeeInfo = res.data
        //     })
        //     set({isLoading: false})
        // }).catch((error: any) => {
        //     set({errorStatus: 'error'})
        // }).finally(() => {
        //     set({errorStatus: 'default'})
        //     set({isLoading: false})
        // })
    },
})))/*, {
    name: "employeeSalaryModalStore",
    version: 1
})*/);

export default useEmployeeSalaryModal;