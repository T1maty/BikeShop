import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {IProductTag} from "../../../../entities";

interface productCatalogTableStore {
    tags: IProductTag[]
    addTag: (tag: IProductTag) => void
    removeTag: (tagId: string) => void
    clearTags: () => void
}

const useProductTagCloudStore = create<productCatalogTableStore>()(persist(devtools(immer((set, get) => ({
    tags: [],
    clearTags: () => {
        set({tags: []})
    },
    addTag: (tag) => {
        {
            set(state => {
                if (get().tags.filter(n => {
                    if (n.id == tag.id) return n
                }).length > 0) {

                } else {
                    state.tags.push(tag)
                }
            })
        }

    },
    removeTag: (tagId) => {
        set(state => {
            state.tags = state.tags.filter(n => {
                if (n.id != tagId) return n
            })
        })
    }

}))), {
    name: "productTagCloudStore",
    version: 1
}));

export default useProductTagCloudStore;