import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {UserShiftStatus} from "../models/UserShiftStatus"
import {LocalStorage} from "./LocalStorage"
import {ShiftAPI} from '../api/User/ShiftAPI'

interface EmployeeStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    shiftStatus: UserShiftStatus | undefined
    getUserShiftStatus: () => void
}

export const useEmployee = create<EmployeeStore>()(persist(devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value) => set({
        isLoading: value
    }),

    shiftStatus: undefined,
    getUserShiftStatus: () => {
        ShiftAPI.getUserStatus(LocalStorage.userId()!).then((r: any) => {
            set(state => {
                state.shiftStatus = r.data
            })
        })
    }
}))), {
    name: "employeeStore",
    version: 1
}));