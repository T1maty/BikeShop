import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../../shared";
import {getGroups, Groups} from "./group";

interface WorkCatalogStore {
    selected: number,
    setSelected: (value: number) => void

    works: [],
    group: Groups[],
    isLoading: boolean,
    currencyId: number | undefined
    getWork: (id: number) => void,
    getGroup: () => void
    chooseMethod: (data: any) => void
    createWork: (data: any) => void
    updateWork: (data: any) => void
}

export const useWorkCatalog = create<WorkCatalogStore>()(persist(devtools(immer((set, get) => ({
    selected: 0,
    setSelected: (value) => {
        set({selected: value})
    },

    works: [],
    group: [] as Groups[],
    isLoading: false,
    currencyId: undefined,

    getWork(id: number) {
        set({isLoading: true})
        $api.get(`/work/getbygroupid/${id}`).then((data) => {
            set({works: data.data.works, currencyId: id})
            set({isLoading: false})
        })
    },

    createWork(data: any) {
        $api.post('/work/create', {
            "name": "test",
            "description": "string",
            "price": 0,
            "groupId": get().currencyId!
        }).then(() => {
            get().getWork(get().currencyId!)
        })
    },

    updateWork(data: any) {
        $api.put('/work/update', {
            "id": data.id,
            "name": `Обновлено в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            "description": "string",
            "price": 0,
            "groupId": get().currencyId!
        }).then(() => {
            get().getWork(get().currencyId!)
        })
    },

    getGroup() {
        $api.get<getGroups>('/group/getbyshopid/1').then((data) => {
            set({group: data.data.workGroups})
        })
    },

    chooseMethod(data: any) {
        switch (data.variant) {
            case('Редактировать'):
                get().updateWork(data.data)
                break
            case('Создать'):
                get().createWork(data.data)
                break
        }
    },


}))), {
    name: "WorkCatalog",
    version: 1
}));

