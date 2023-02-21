import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {ServiceItem} from "../../../entities/responses/ServiceItem";
import {$api} from "../../../shared";
import {CreateService} from "../../../entities/requests/CreateService";
import {IUser} from "../../../entities";

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    user: IUser
    setUser: (user: IUser) => void

    services: ServiceItem[]
    setService: (value: string) => void
    getAllServices: () => any // надо исправить тип



    // name: string
    // clientDescription: string

    // userMasterId: string
    // setUserMasterId: (value: string) => void
    // userMasterDescription: string
    // setUserMasterDescription: (value: string) => void
    //
    // addNewService: (data: any) => any // надо исправить тип
    // updateService: (data: any) => any // надо исправить тип
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),
    user: {
        id: '',
        shopId: 0,
        lastName: 'Клиент',
        firstName: 'не',
        patronymic: 'выбран',
        balance: 0,
        balanceCurrencyId: 0,
        creditLimit: 0,
        phoneNumber: '',
        phoneNumberConfirmed: false,
        email: '',
        emailConfirmed: false
    },
    setUser: (user: IUser) => set({
        user: user
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

    // name: '',
    // clientDescription: '',



    // userMasterId: '',
    // userMasterDescription: '',
    // setUserMasterId: (value: string) => set({
    //     userMasterId: value
    // }),
    // setUserMasterDescription: (value: string) => set({
    //     userMasterDescription: value
    // }),
    //
    // addNewService: (data: CreateService) => {
    //     return $api.post('/service/create', data)
    // },
    // updateService: (data: CreateService) => {
    //     return $api.put('/service/updateservice', data)
    // },
})))/*, {
    name: "ServiceStore",
    version: 1
})*/);

export default useService;