export interface ProductCardOption {
    option: ProductCardSpecification
    optionVariants: ProductCardOptionVariant[]
}

export interface ProductCardSpecification {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    enabled: boolean
}

export interface ProductCardOptionVariant {
    optionId: number
    optionName: string
    id: number
    name: string
    createdAt: string
    updatedAt: string
    enabled: boolean
}