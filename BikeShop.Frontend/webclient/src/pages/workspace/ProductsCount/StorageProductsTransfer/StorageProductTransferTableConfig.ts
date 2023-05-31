import {UniTableColumn} from "../../../../entities";

export const columns: UniTableColumn[] = [
    {
        id: 'productId',
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
        label: 'Количество',
        minWidth: 70,
        align: 'right',
        isEditable: true,
        isNumber: true
    },
    {
        id: 'quantityUnitName',
        label: 'Ед.Изм.',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'catalogKey',
        label: 'Каталожный номер',
        minWidth: 70,
        align: 'left',
    },
]