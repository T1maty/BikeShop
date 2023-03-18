export interface CatalogProduct {
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
            createdAt: string
            updatedAt: string
            enabled: boolean
            productId: number
            specificationId: number
            sortOrder: number
            description: string
            name: string
        }
    ],
    productOptions: [
        {
            id: number
            createdAt: string
            updatedAt: string
            enabled: boolean
            optionVariantId: number
            productId: number
            sortOrder: number
            lintProductId: number
            name: string
            optionName: string
        }
    ],
    productImages: [
        {
            id: number
            createdAt: string
            updatedAt: string
            enabled: boolean
            productId: number
            sortOrder: number
            url: string
        }
    ]
}