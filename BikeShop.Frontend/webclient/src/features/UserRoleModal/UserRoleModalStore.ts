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
    isCreateModalLoading: boolean
    errorStatusForCreateModal: ErrorStatusTypes

    roles: Role[]
    getAllRoles: () => void
    groups: RoleGroup[]
    getAllGroups: () => void

    createGroup: (params: CreateRoleGroup) => void
}

const useUserRoleModal = create<UserRoleModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openUserRoleModal: false,
    setOpenUserRoleModal: (value) => set({
        openUserRoleModal: value
    }),
    isLoading: false,
    errorStatus: 'default',
    isCreateModalLoading: false,
    errorStatusForCreateModal: 'default',

    roles: [],
    getAllRoles: () => {
        set({isLoading: true})
        RoleAPI.getAllRoles().then((res) => {
            set(state => {
                state.roles = res.data
            })
            console.log('roles:', res.data)
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
            console.log('roleGroups:', res.data)
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    createGroup: (params) => {
        set({isCreateModalLoading: true})
        RoleAPI.createRoleGroup(params).then((res) => {
            set(state => {
                state.groups.push(res.data)
            })
            set({isCreateModalLoading: false})
            set({errorStatusForCreateModal: 'success'})
            console.log('группа создана', res)
        }).catch((error: any) => {
            set({errorStatusForCreateModal: 'error'})
            console.log('создание группы', error)
        }).finally(() => {
            set({errorStatusForCreateModal: 'default'})
            set({isCreateModalLoading: false})
        })
    },
})))/*, {
    name: userRoleModalStore",
    version: 1
})*/);

export default useUserRoleModal;