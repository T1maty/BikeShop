import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../entities/enumerables/ErrorStatusTypes"
import {CreateRoleGroup, Role, RoleAPI, RoleGroup} from "../../entities"

interface UserRoleModalStore {
    openUserRoleModal: boolean
    setOpenUserRoleModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    roles: Role[]
    getAllRoles: () => void
    groups: RoleGroup[]
    getAllGroups: () => void

    createGroup: (data: CreateRoleGroup) => void
}

const useUserRoleModal = create<UserRoleModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openUserRoleModal: false,
    setOpenUserRoleModal: (value) => set({
        openUserRoleModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    roles: [],
    getAllRoles: () => {
        set({isLoading: true})
        RoleAPI.getAllRoles().then((res) => {
            set(state => {
                state.roles = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    groups: [],
    getAllGroups: () => {
        set({isLoading: true})
        RoleAPI.getAllRoleGroups().then((res) => {
            set(state => {
                state.groups = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    createGroup: (data) => {
        set({isLoading: true})
        RoleAPI.createRoleGroup(data).then((res) => {
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
            console.log('создание группы', error)
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: userRoleModalStore",
    version: 1
})*/);

export default useUserRoleModal;