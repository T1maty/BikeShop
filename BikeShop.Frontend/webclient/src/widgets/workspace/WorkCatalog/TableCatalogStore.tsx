import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../shared"
import {Work, Group} from "../../../entities"

interface WorkCatalogStore {
    selected: Group
    setSelected: (value: Group) => void

    selectedRow: Work
    setSelectedRow: (value: Work) => void

    works: Work[]
    setWorks: (value: Work[]) => void,
    group: Group[]
    addGroup: (value: Group) => void,
    isLoading: boolean
    currencyId: number | undefined
    getWork: (id: number) => void
    addWork: (work: Work) => void
    getGroup: () => void
    chooseMethod: (data: any) => void
    createWork: (data: any) => void
    updateWork: (data: any) => void
}

export const useWorkCatalog = create<WorkCatalogStore>()(persist(devtools(immer((set, get) => ({
    selectedRow: {} as Work,
    setSelectedRow: (value) => {
        set({selectedRow: value})
    },

    addGroup: (value) => {
        set({group: [...get().group, value]})

    },

    selected: {} as Group,
    setSelected: (value) => {
        set({selected: value})
    },

    addWork: (work) => {
        set({
            works: [...get().works, work]
        })
        set({selectedRow: work})
    },

    works: [],
    group: [] as Group[],
    isLoading: false,
    currencyId: undefined,

    setWorks: (value) => {
        set({works: value})
    },

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
        $api.get<Group[]>('/group/getbyshopid/1').then((data) => {
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

