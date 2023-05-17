import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogAPI, Product, ProductCardAPI, ProductFullData, ProductTag, ShopAPI} from '../../../../entities'
import {ErrorStatusTypes} from '../../../../entities/enumerables/ErrorStatusTypes'
import Enumerable from "linq";
import {ProductTagWithChildrens} from "../../../../entities/models/ProductTagWithChildrens";

interface UseCatalogStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    errorStatus: ErrorStatusTypes

    tags: ProductTag[]
    tagsProc: ProductTagWithChildrens[]
    tagsWithChildrens: ProductTagWithChildrens[]
    getTags: () => void
    userCurrentTags: ProductTag[]
    setUserCurrentTagsArray: (array: any[]) => void
    setUserCurrentTag: (tag: ProductTag) => void
    deleteUserCurrentTag: (filteredTags: ProductTag[]) => void

    defaultProducts: ProductFullData[]
    getDefaultProducts: () => void
    getProductsByTags: (tags: string[]) => void

    currentProduct: ProductFullData | null
    setCurrentProduct: (product: ProductFullData | null) => void
    getCurrentProduct: (productId: number) => void

    searchProductsResult: Product[]
    getSearchProducts: (inputValue: string) => void

    selectedTags: string[]
    setSelectedTags: (n: string) => void

    expandedTags: string[]
    setExpandedTags: (n: string[]) => void
}

const useCatalog = create<UseCatalogStore>()(persist(devtools(immer((set, get) => ({
    expandedTags: [],
    tagsProc: [],
    tagsWithChildrens: [],
    setExpandedTags: (n) => {
        set({userCurrentTags: get().userCurrentTags.filter(k => !n.includes(k.id))})
        let data = n.filter(n => !Enumerable.from(get().userCurrentTags).select(n => n.id).contains(n))
        set({expandedTags: data})
    },
    selectedTags: [],
    setSelectedTags: (n) => {
        set({selectedTags: [n]})
    },
    isLoading: false,
    setIsLoading: (value) => set({isLoading: value}),
    errorStatus: 'default',

    tags: [],
    getTags: () => {
        set({isLoading: true})
        ShopAPI.getTags().then(res => {
            set(state => {
                state.tags = res.data
                console.log('все теги', state.tags)
            })
            let childrenData: ProductTagWithChildrens[] = []
            const recurssion = (archive: ProductTag[], parent: string = '0') => {
                let dt: ProductTagWithChildrens[] = []
                archive.forEach(n => {
                    if (n.parentId == parent) {
                        const childrens = recurssion(archive, n.id)
                        let ent = {
                            tag: n,
                            childrens: childrens,
                            childrenIds: Enumerable.from(childrens).select(k => k.tag.id).toArray()
                        }
                        dt.push(ent)
                        childrenData.push(ent)
                    }
                })
                return dt
            }

            let dt: ProductTagWithChildrens[] = recurssion(res.data)
            set({tagsProc: dt})
            set({tagsWithChildrens: childrenData})
            console.log('recurssion', dt)

            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            // set({isLoading: false})
        })
    },
    userCurrentTags: [],
    setUserCurrentTagsArray: (array) => set(state => {
        state.userCurrentTags = array
    }),
    setUserCurrentTag: (tag) => {
        let childrens = get().tagsWithChildrens.find(n => n.tag.id == tag.id)?.childrenIds
        let newData = get().userCurrentTags.filter(n => !childrens?.includes(n.id))
        newData.push(tag)
        set({userCurrentTags: newData})
        let n = get().expandedTags
        let data = n.filter(n => !Enumerable.from(get().userCurrentTags).select(n => n.id).contains(n))
        set({expandedTags: data})
    },
    deleteUserCurrentTag: (filteredTags) => set(state => {
        state.userCurrentTags = filteredTags
    }),

    defaultProducts: [],
    getDefaultProducts: () => {
        set({isLoading: true})
        ShopAPI.getDefaultProducts().then(res => {
            set(state => {
                state.defaultProducts = res.data
                console.log('дефолтные товары', state.defaultProducts)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            // set({isLoading: false})
        })
    },
    getProductsByTags: (tags) => {
        set({isLoading: true})
        ShopAPI.getCatalogProductsByTag(tags).then(res => {
            set(state => {
                state.defaultProducts = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
            console.log('ошибка получения по тегам', error)
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },

    currentProduct: {} as ProductFullData,
    setCurrentProduct: (product) => {
        set({currentProduct: product})
    },
    getCurrentProduct: (productId: number) => {
        set({isLoading: true})
        ProductCardAPI.getProductCardById(productId).then(res => {
            set(state => {
                state.currentProduct = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
            console.log(error)
        }).finally(() => {
            set({isLoading: false})
            set({errorStatus: 'default'})
        })
    },

    searchProductsResult: [],
    getSearchProducts: (inputValue: string) => {
        set({isLoading: true})
        CatalogAPI.searchProductByName(inputValue).then(res => {
            set(state => {
                state.searchProductsResult = res.data
                set({isLoading: false})
                console.log('найденные товары', state.searchProductsResult)
            })
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({isLoading: false})
            set({errorStatus: 'default'})
        })
    }
}))), {
    name: "useCatalog",
    version: 1
}));

export default useCatalog;