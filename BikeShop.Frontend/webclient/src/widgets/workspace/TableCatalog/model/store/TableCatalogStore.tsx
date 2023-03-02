import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../../../../shared";

interface WorkCatalogStore {
    works: [],
    group: [],
    isLoading: boolean,
    currencyId: number | undefined
    getWork: (id: number) => void,
    getGroup: () => void
    chooseMethod: (data: any) => void
    createWork: (data: any) => void
    updateWork: (data: any) => void
}

export const useWorkCatalog = create<WorkCatalogStore>()(persist(devtools(immer((set, get) => ({
    works: [],
    group: [],
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
            "groupId": 1
        }).then(() => {
            get().getWork(1)
        })
    },

    updateWork(data: any) {
        $api.put('/work/update', {
            "id": data.id,
            "name": `Обновлено в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            "description": "string",
            "price": 0,
            "currencyId": 2,
            "groupId": 1
        }).then(() => {
            get().getWork(1)
        })
    },

    getGroup() {
        $api.get('/group/getbyshopid/1').then((data) => {
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

