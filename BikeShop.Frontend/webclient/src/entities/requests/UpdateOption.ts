export interface UpdateOption {
    id: number
    name: string
    optionVariants: [
        {
            id: number
            name: string
            enabled: boolean
        }
    ],
    enabled: boolean
}