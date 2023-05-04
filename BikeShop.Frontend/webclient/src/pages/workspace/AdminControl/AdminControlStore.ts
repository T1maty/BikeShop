import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {AuthAPI, UserNew} from '../../../entities'
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"

interface AdminControlStore {
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    selectedEmployee: UserNew | null
    setSelectedEmployee: (employeeId: string) => void

    employers: UserNew[]
    getEmployersList: () => void
}

// стор на всякий случай
const useAdminControl = create<AdminControlStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    errorStatus: 'default',

    selectedEmployee: null,
    setSelectedEmployee: (empId) => {
        let employee = get().employers.find(emp => emp.user.id === empId)

        if (employee === undefined) console.log('employee UNDEFINED')
        set(state => {
            state.selectedEmployee = employee!
        })
    },

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
})))/*, {
    name: "adminControlStoreStore",
    version: 1
})*/);

export default useAdminControl;