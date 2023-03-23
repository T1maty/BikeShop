export interface CardOption {
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