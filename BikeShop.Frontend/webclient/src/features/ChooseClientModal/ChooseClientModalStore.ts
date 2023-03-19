import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateUser, IUser} from '../../entities';

interface SearchClient {
    fio: string
    phoneNumber: string
}

interface ChooseClientModalStore {
    openClientModal: boolean
    setOpenClientModal: (value: boolean) => void
    isLoading: boolean
    // isClientChosen: boolean
    // setIsClientChosen: (value: boolean) => void
    users: IUser[]
    setUsers: (users: any) => void
    fio: string
    phoneNumber: string
    setFIO: (value: string) => void
    setPhoneNumber: (value: string) => void
    findUser: (data: SearchClient) => any // исправить тип
    addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>
}

const useChooseClientModal = create<ChooseClientModalStore>()(/*persist(*/devtools(immer((set) => ({
    openClientModal: false,
    setOpenClientModal: (value) => set({openClientModal: value}),
    isLoading: false,
    // isClientChosen: false,
    // setIsClientChosen: (value) => set({isClientChosen: value}),

    users: [],
    setUsers: (users) => set({users: users}),
    fio: '',
    setFIO: (value) => set({fio: value}),
    phoneNumber: '',
    setPhoneNumber: (value) => set({phoneNumber: value}),

    findUser: (data: SearchClient) => {
        set({isLoading: true})
        return $api.get(`/user/find?fio=${data.fio}&phone=${data.phoneNumber}`)
            .then(res => {
            set(state => {state.users = [...res.data.users]})
            set({isLoading: false})
        })
    },
    addNewUser: (data) => {return $api.post<CreateUser>('/user/create', data)}
})))/*, {
    name: "chooseClientModalStore",
    version: 1
})*/);

export default useChooseClientModal;