import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {CreateUser} from '../../entities';

interface ChooseClientModalStore {
    chooseClientModal: boolean
    setChooseClientModal: (value: boolean) => void
    addNewUser: (data: CreateUser) => Promise<AxiosResponse<CreateUser>>
}

const useChooseClientModal = create<ChooseClientModalStore>()(persist(devtools(immer((set) => ({
    chooseClientModal: false,
    setChooseClientModal: (value: boolean) => set({
        chooseClientModal: value
    }),
    addNewUser: (data) => {
        return $api.post<CreateUser>('/user/create', data)
    }
}))), {
    name: "chooseClientModalStore",
    version: 1
}));

export default useChooseClientModal;