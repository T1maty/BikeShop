import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ProductTag} from "../../../../entities"

interface productCatalogTableStore {
    tags: ProductTag[]
    addTag: (tag: ProductTag) => void
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