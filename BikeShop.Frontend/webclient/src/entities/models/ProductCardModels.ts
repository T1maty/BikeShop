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

export interface ProductCardUserSpecification {
    id: number
    name: string
    title: string // ? добавочное поле
}

export interface ProductCardImage {
    id: number
    productId: number
    sortOrder: number
    url: string
    createdAt: string
    updatedAt: string
    enabled: boolean
}

// ВАРИАНТ С АССОЦИАТИВНЫМ МАССИВОМ
// export interface ProductCardOptionVariantsDomainType {
//     [id: number]: ProductCardOptionVariant[] // id = ProductCardOption.option.id
// }

// initialState_CurrentCardOptions: ProductCardSpecification[] = []
// {id: 1, name: 'option', createdAt: '', updatedAt: '', enabled: true}

// initialState_ProductCardOptionVariant: ProductCardOptionVariantsDomainType = {}
// [id]: [ {ProductCardOptionVariant} ]

// добавление новой опции в список
// const newOption: ProductCardSpecification = {...}
// return [newOption, ...state];

// добавление новой разновидности опции в список опций
// const newOptionVariant: ProductCardOptionVariant = {...}
// return {...state, [newOptionVariant.id]: [newOptionVariant, ...state[newOptionVariant.id]]}