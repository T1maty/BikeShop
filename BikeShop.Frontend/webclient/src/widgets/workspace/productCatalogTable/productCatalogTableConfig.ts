export interface Column {
    id: 'id' | 'name' | 'store' | 'unit' | 'priceIncome' | 'priceB2B' | 'priceRetail' | 'tags' | 'catalogKey' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right';
}

export const columns: readonly Column[] = [
    {
        id: 'id',
        label: 'Артикул',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'name',
        label: 'Название',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'store',
        label: 'На складе',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'unit',
        label: 'Ед.изм.',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'priceIncome',
        label: 'Средний приход',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'priceB2B',
        label: 'Цена оптовая',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'priceRetail',
        label: 'Цена розничная',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'tags',
        label: 'Теги',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'catalogKey',
        label: 'Каталожный номер',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'status',
        label: 'Статус заполения',
        minWidth: 70,
        align: 'right',
    },
]

export interface Data {
    id: number;
    name: string;
    store: number;
    unit: string;
    priceIncome: number;
    priceB2B: number;
    priceRetail: number;
    tags: string;
    catalogKey: string;
    status: string;
}

export const testRows = [{
    id: 1,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 2,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 3,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 4,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 5,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 6,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 7,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 8,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 9,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 10,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}, {
    id: 11,
    name: "string",
    store: 1,
    unit: "string",
    priceIncome: 1,
    priceB2B: 1,
    priceRetail: 1,
    tags: "string",
    catalogKey: "string",
    status: "string",
}]