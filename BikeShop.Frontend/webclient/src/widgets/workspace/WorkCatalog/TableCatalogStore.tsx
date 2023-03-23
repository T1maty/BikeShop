import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../../shared";
import {Work, WorkGroup} from "../../../entities";

interface WorkCatalogStore {
    selected: WorkGroup,
    setSelected: (value: WorkGroup) => void

    works: Work[],
    group: WorkGroup[],
    isLoading: boolean,
    currencyId: number | undefined
    getWork: (id: number) => void,
    addWork: (work: Work) => void,
    getGroup: () => void
    chooseMethod: (data: any) => void
    createWork: (data: any) => void
    updateWork: (data: any) => void
}

export const useWorkCatalog = create<WorkCatalogStore>()(persist(devtools(immer((set, get) => ({
    selected: {} as WorkGroup,
    setSelected: (value) => {
        set({selected: value})
    },

    addWork: (work) => {
        set({
            works: [...get().works, work]
        })
        console.log(work)
    },

    works: [],
    group: [] as WorkGroup[],
    isLoading: false,
    currencyId: undefined,

    getWork(id: number) {
        set({isLoading: true})
        $api.get<Work[]>(`/work/getbygroupid/${id}`).then((data) => {
            set({works: data.data, currencyId: id})
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
        $api.get<WorkGroup[]>('/group/getbyshopid/1').then((data) => {
            console.log('Groups:', data.data)
            set({group: data.data})
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

