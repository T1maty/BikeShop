import {UniTableColumn} from "../../../../entities";

export const columns: UniTableColumn[] = [
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
        id: 'quantity',
        label: 'На складе',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'quantityUnitName',
        label: 'Ед.Изм',
        minWidth: 70,
        align: 'left',
    },
    /*
    {
        id: 'unit',
        label: 'Ед.изм.',
        minWidth: 70,
        align: 'right',
    },*/
    {
        id: 'incomePrice',
        label: 'Средний приход',
        minWidth: 70,
        align: 'right',
        isCurrency: true
    },
    {
        id: 'dealerPrice',
        label: 'Цена оптовая',
        minWidth: 70,
        align: 'right',
        isCurrency: true
    },
    {
        id: 'retailPrice',
        label: 'Цена розничная',
        minWidth: 70,
        align: 'right',
        isCurrency: true
    },
    /*{
        id: 'tags',
        label: 'Теги',
        minWidth: 70,
        align: 'right',
    },*/
    {
        id: 'catalogKey',
        label: 'Каталожный номер',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'checkStatus',
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