import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../entities/enumerables/ErrorStatusTypes"
import {AuthAPI, SalaryAPI, SalaryResponse, UpdateSalaryParams, UserNew} from '../../entities'

interface EmployeeSalaryModalStore {
    openEmployeeSalaryModal: boolean
    setOpenEmployeeSalaryModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    employers: UserNew[]
    getEmployersList: () => void

    currentEmployee: UserNew | null
    setCurrentEmployee: (employee: UserNew | null) => void
    currentEmployeeSalary: SalaryResponse

    getEmployeeSalary: (userId: string) => void
    updateEmployeeSalary: (paramsData: UpdateSalaryParams) => void
}

const useEmployeeSalaryModal = create<EmployeeSalaryModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openEmployeeSalaryModal: false,
    setOpenEmployeeSalaryModal: (value) => set({
        openEmployeeSalaryModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    employers: [],
    getEmployersList: () => {
        set({isLoading: true})
        AuthAPI.User.getEmployers().then((res: any) => {
            set(state => {
                state.employers = res.data.users.filter((user: UserNew) => user.user.shopId === 1)
                console.log(state.employers)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    currentEmployee: null,
    setCurrentEmployee: (employee) => {
        set({currentEmployee: employee})
    },
    currentEmployeeSalary: {} as SalaryResponse,

    getEmployeeSalary: (userId: string) => {
        set({isLoading: true})
        SalaryAPI.getEmployeeSalaryById(userId).then((res: any) => {
            set(state => {
                state.currentEmployeeSalary = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    updateEmployeeSalary: (paramsData) => {
        set({isLoading: true})
        SalaryAPI.updateEmployeeSalary(paramsData).then((res: any) => {
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "employeeSalaryModalStore",
    version: 1
})*/);

export default useEmployeeSalaryModal;