import {UniTableColumn} from "../../entities";

export const Columns: UniTableColumn[] = [
    {
        id: 'id',
        label: 'Артикул',
        minWidth: 30,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Нзвание',
        minWidth: 120,
        align: 'right',
    },
    {
        id: 'catalogKey',
        label: 'Каталожный номер',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'incomePrice',
        label: 'Цена возможной закупки',
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
    {
        id: 'dealerPrice',
        label: 'Дилерская цена',
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
    {
        id: 'retailPrice',
        label: 'Розничная цена',
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
]