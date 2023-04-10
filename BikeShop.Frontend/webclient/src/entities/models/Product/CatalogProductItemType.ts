import {ProductOptionsWithVariants}
    from "../../../features/ProductCatalogFeatures/EditProductCardModal/models/ProductOptionsWithVariants"
import {ProductOptionVariantBind} from './ProductOptionVariantBind'

export interface CatalogProductItemType {
    product: {
        id: number
        createdAt: string
        updatedAt: string
        enabled: boolean
        name: string
        catalogKey: string
        category: string
        barcode: string
        manufacturerBarcode: string
        quantityUnitId: number
        incomePrice: number
        dealerPrice: number
        retailPrice: number
        brandId: number
        checkStatus: string
        retailVisibility: boolean
        b2BVisibility: boolean
    },
    productCard: {
        id: number
        createdAt: string
        updatedAt: string
        enabled: boolean
        productId: number
        descriptionShort: string
        description: string
    },
    productSpecifications: [
        {
            id: number
            name: string
            description: string
            productId: number
            specificationId: number
            sortOrder: number
            enabled: boolean
            createdAt: string
            updatedAt: string
        }
    ],
    productOptions: ProductOptionVariantBind[],
    // productOptions: ProductOptionsWithVariants[],
    productImages: [
        {
            id: number
            productId: number
            sortOrder: number
            url: string
            enabled: boolean
            createdAt: string
            updatedAt: string
        }
    ],
    productTags: [
        {
            id: number
            name: string
            parentId: number
            isCollapsed: boolean
            isRetailVisible: boolean
            isB2BVisible: boolean
            isUniversal: boolean
            sortOrder: number
            enabled: boolean
            createdAt: string
            updatedAt: string
        }
    ]
}