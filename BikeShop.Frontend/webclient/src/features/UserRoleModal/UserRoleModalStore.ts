import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../entities/enumerables/ErrorStatusTypes"
import {CreateRoleGroup, Role, RoleAPI, RoleGroup} from "../../entities"
import {RoleToGroupBind} from "../../entities/models/Service/RoleToGroupBind";

interface UserRoleModalStore {
    openUserRoleModal: boolean
    setOpenUserRoleModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes
    isCreateModalLoading: boolean
    errorStatusForCreateModal: ErrorStatusTypes

    roles: Role[]
    selectedRole: Role | null
    setSelectedRole: (n: Role) => void
    getAllRoles: () => void

    groups: RoleGroup[]
    selectedGroup: RoleGroup | null
    setSelectedGroup: (n: RoleGroup) => void
    getAllGroups: () => void
    removeRoleFromGroup: (role: string, onSuccess: () => void) => void

    selectedGroupRole: RoleToGroupBind | null
    setSelectGroupRole: (n: RoleToGroupBind | null) => void

    createGroup: (params: CreateRoleGroup) => void
    createRole: (name: string, onSuccess: () => void) => void

    roleToGroup: (onSuccess: () => void, onFail: () => void) => void
    roleFromGroup: (onSuccess: () => void, onFail: () => void) => void
}

const useUserRoleModal = create<UserRoleModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    selectedGroupRole: null,
    selectedRole: null,
    setSelectedRole: (n) => {
        set({selectedRole: n})
    },
    setSelectGroupRole: (n) => {
        set({selectedGroupRole: n})
    },
    openUserRoleModal: false,
    setOpenUserRoleModal: (value) => set({
        openUserRoleModal: value
    }),
    isLoading: false,
    errorStatus: 'default',
    isCreateModalLoading: false,
    errorStatusForCreateModal: 'default',

    createRole: (name, s) => {
        RoleAPI.createRole(name).then((res) => {
            set({
                roles: [...get().roles, res.data]
            })
            set({isLoading: false})
            s()
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    removeRoleFromGroup: (r, s) => {
        RoleAPI.removeRoleFromGroup(get().selectedGroup?.group.id!, r).then((res) => {
            set({
                groups: get().groups.map(n => {
                    if (n.group.id === res.data.group.id) return res.data
                    else return n
                })
            })
            console.log('roles:', res.data)
            set({isLoading: false})
            s()
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    roleToGroup: (s, f) => {
        RoleAPI.setRoleToGroup({
            role: get().selectedRole?.name!,
            groupId: get().selectedGroup?.group.id!,
            description: "1"
        }).then((res) => {
            let data = get().groups.map(n => {
                if (n.group.id === res.data.group.id) return res.data
                else return n
            })
            set({isLoading: false})
            set({groups: data})
            console.log('roles:', res.data)
            s()

        }).catch((error: any) => {
            f()
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    roleFromGroup: (s, f) => {
        RoleAPI.removeRoleFromGroup(get().selectedGroup?.group.id!, get().selectedGroupRole?.role!).then((res) => {
            set({
                groups: get().groups.map(n => {
                    if (n.group.id === res.data.group.id) return res.data
                    else return n
                })
            })
            console.log('roles:', res.data)
            set({isLoading: false})
            s()
        }).catch((error: any) => {
            f()
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

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

    selectedGroup: null,
    setSelectedGroup: (n) => {
        set({selectedGroup: n})
    },
    groups: [],
    getAllGroups: () => {
        set({isLoading: true})
        RoleAPI.getAllRoleGroups().then((res) => {
            set(state => {
                state.groups = res.data
            })
            console.log('groups:', res.data)
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
                state.groups.push({group: res.data, roles: []})
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