import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {ServiceItem} from "../../../entities/responses/ServiceItem";
import {$api} from "../../../shared";
import {CreateService} from "../../../entities/requests/CreateService";

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    services: ServiceItem[]
    setService: (value: string) => void
    getAllServices: () => any // надо исправить тип
    name: string
    clientDescription: string
    userMasterDescription: string
    addNewService: (data: any) => any // надо исправить тип
    updateService: (data: any) => any // надо исправить тип
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),
    services: [],
    setService: () => set({
        // code here
    }),
    getAllServices: () => {
        set({isLoading: true});
        return $api.get('/service/getbyshopid/1').then(res => {
            set(state => {
                // state.services.unshift(...res.data.users)
                state.services = [...res.data.services]
            })
            set({isLoading: false});
        })
    },

    name: '',
    clientDescription: '',
    userMasterDescription: '',
    addNewService: (data: CreateService) => {
        return $api.post('/service/create', data)
    },
    updateService: (data: CreateService) => {
        return $api.put('/service/updateservice', data)
    },
})))/*, {
    name: "ServiceStore",
    version: 1
})*/);

export default useService;