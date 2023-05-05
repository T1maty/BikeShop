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
        label: 'Доступно',
        minWidth: 35,
        align: 'right',
    },
    {
        id: 'quantityUnitName',
        label: 'Ед.Изм',
        minWidth: 20,
        align: 'left',
    },
    {
        id: 'reserved',
        label: 'Бронь',
        minWidth: 35,
        align: 'right',
    },
    {
        id: 'quantityUnitName',
        label: 'Ед.Изм',
        minWidth: 20,
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
        label: 'Закупочная',
        minWidth: 70,
        align: 'right',
        isCurrency: true
    },
    {
        id: 'dealerPrice',
        label: 'Оптовая',
        minWidth: 70,
        align: 'right',
        isCurrency: true
    },
    {
        id: 'retailPrice',
        label: 'Розничная',
        minWidth: 70,
        align: 'right',
        isCurrency: true
    },
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