export interface CardOption {
    option: {
        name: string
        id: number
        createdAt: string
        updatedAt: string
        enabled: boolean
    },
    optionVariants: [
        {
            optionId: boolean
            name: string
            optionName: string
            id: boolean
            createdAt: string
            updatedAt: string
            enabled: boolean
        },
        {
            optionId: boolean
            name: string
            optionName: string
            id: boolean
            createdAt: string
            updatedAt: string
            enabled: boolean
        }
    ]
}