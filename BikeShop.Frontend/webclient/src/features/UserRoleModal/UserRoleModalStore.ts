import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../entities/enumerables/ErrorStatusTypes"

interface UserRoleModalStore {
    openUserRoleModal: boolean
    setOpenUserRoleModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    // archive: any[]
    // getArchive: () => void
}

const useUserRoleModal = create<UserRoleModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openUserRoleModal: false,
    setOpenUserRoleModal: (value) => set({
        openUserRoleModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    // archive: [],
    // getArchive: () => {
        // set({isLoading: true})
        // ArchiveAPI.getArchive().then((res: any) => {
        //     set(state => {
        //         state.archive = res.data
        //     })
        //     set({isLoading: false})
        // }).catch((error: any) => {
        //     set({errorStatus: 'error'})
        // }).finally(() => {
        //     set({errorStatus: 'default'})
        //     set({isLoading: false})
        // })
    // },
})))/*, {
    name: userRoleModalStore",
    version: 1
})*/);

export default useUserRoleModal;