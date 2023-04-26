import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {UserShiftStatus} from "../models/UserShiftStatus"
import {LocalStorage} from "./LocalStorage"
import {ShiftAPI} from '../api/User/ShiftAPI'

interface EmployeeStore {
    shiftStatus: UserShiftStatus | undefined
    getUserShiftStatus: () => void
}

export const useEmployee = create<EmployeeStore>()(persist(devtools(immer((set) => ({
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