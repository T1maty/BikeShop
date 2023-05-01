import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {Work, Group, TableCatalogAPI} from '../../../entities'

interface WorkCatalogStore {
    isLoading: boolean
    currencyId: number | undefined

    selected: Group
    setSelected: (value: Group) => void

    selectedRow: Work
    setSelectedRow: (value: Work) => void

    group: Group[]
    addGroup: (value: Group) => void
    getGroup: () => void

    works: Work[]
    setWorks: (value: Work[]) => void
    getWork: (id: number) => void
    addWork: (work: Work) => void
    createWork: (data: any) => void
    updateWork: (data: any) => void

    chooseMethod: (data: any) => void
}

export const useWorkCatalog = create<WorkCatalogStore>()(persist(devtools(immer((set, get) => ({
    isLoading: false,
    currencyId: undefined,

    selectedRow: {} as Work,
    setSelectedRow: (value) => {
        set({selectedRow: value})
    },

    selected: {} as Group,
    setSelected: (value) => {
        set({selected: value})
    },

    group: [] as Group[],
    addGroup: (value) => {
        set({group: [...get().group, value]})

    },
    getGroup() {
        TableCatalogAPI.getCatalogGroup().then((data) => {
            console.log('Groups:', data.data)
            set({group: data.data})
        })
    },

    works: [],
    setWorks: (value) => {
        set({works: value})
    },
    getWork(id: number) {
        set({isLoading: true})
        TableCatalogAPI.getWorkGroup(id).then((data) => {
            set({works: data.data, currencyId: id})
            set({isLoading: false})
        })
    },
    addWork: (work) => {
        set({
            works: [...get().works, work]
        })
        set({selectedRow: work})
    },
    createWork(data: any) {
        TableCatalogAPI.createWork( {
            "name": "test",
            "description": "string",
            "price": 0,
            "groupId": get().currencyId!
        }).then(() => {
            get().getWork(get().currencyId!)
        })
    },
    updateWork(data: any) {
        TableCatalogAPI.updateWork( {
            "id": data.id,
            "name": `Обновлено в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            "description": "string",
            "price": 0,
            "groupId": get().currencyId!
        }).then(() => {
            get().getWork(get().currencyId!)
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

