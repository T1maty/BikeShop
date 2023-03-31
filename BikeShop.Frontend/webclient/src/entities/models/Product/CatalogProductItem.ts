export interface CatalogProductItem {
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
    productOptions: [
        {
            id: number
            name: string
            createdAt: string
            updatedAt: string
            enabled: boolean
            optionVariantId: number
            productId: number
            sortOrder: number
            lintProductId: number
            optionName: string
        }
    ],
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