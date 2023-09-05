import {UniTableColumn} from "../../../../entities"

export const columns: UniTableColumn[] = [
    {
        id: 'id',
        label: 'Артикул',
        width: 10,
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Название',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'quantity',
        label: 'Доступно',
        width: 5,
        minWidth: 35,
        align: 'right',
    },
    {
        id: 'quantityUnitName',
        label: 'Ед.изм',
        width: 5,
        minWidth: 20,
        align: 'left',
    },
    {
        id: 'reserved',
        label: 'Бронь',
        width: 5,
        minWidth: 35,
        align: 'right',
    },
    {
        id: 'quantityUnitName',
        label: 'Ед.изм',
        width: 5,
        minWidth: 20,
        align: 'left',
    },
    {
        id: 'incomePrice',
        label: 'Закупочная',
        width: 10,
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
    {
        id: 'dealerPrice',
        label: 'Оптовая',
        width: 10,
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
    {
        id: 'retailPrice',
        label: 'Розничная',
        width: 10,
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
    {
        id: 'catalogKey',
        label: 'Каталожный номер',
        width: 10,
        minWidth: 70,
        align: 'center',
    },
]