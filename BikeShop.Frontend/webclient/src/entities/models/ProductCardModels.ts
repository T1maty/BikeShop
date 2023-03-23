export interface ProductCardOption {
    option: {
        id: number
        name: string
        createdAt: string
        updatedAt: string
        enabled: boolean
    },
    optionVariants: [
        {
            optionId: boolean
            optionName: string
            id: boolean
            name: string
            createdAt: string
            updatedAt: string
            enabled: boolean
        },
    ]
}

export interface ProductCardSpecification {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    enabled: boolean
}