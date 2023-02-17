import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";

interface ServiceStore {
    repairs: []
    userId: string
    setRepair: (value: string) => void
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set) => ({
    repairs: [],
    userId: '',
    setRepair: () => set({
        // code here
    }),

    // getUsers: () => {
    //     set({isLoading: true});
    //     return $api.get('/user/find').then(res => {
    //         set(state => {
    //             // state.usersD.push(...res.data.users)
    //             state.users = [...res.data.users]
    //         })
    //         set({isLoading: false});
    //     })
    // },
    // findUser: (request: SearchClient) => {
    //     set({isLoading: true});
    //     return $api.get(`/user/find?fio=${request.fio}&phone=${request.phoneNumber}`).then(res => {
    //         set(state => {
    //             state.users = [...res.data.users]
    //         })
    //         set({isLoading: false});
    //     })
    // },
})))/*, {
    name: "ServiceStore",
    version: 1
})*/);

export default useService;