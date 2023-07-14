import {UniTableColumn} from "../../entities";

export const Columns: UniTableColumn[] = [
    {
        id: 'id',
        label: 'Артикул',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Нзвание',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'catalogKey',
        label: 'Нзвание',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'quantity',
        label: 'Количество',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'quantitySticker',
        label: 'Количество стикеров',
        minWidth: 70,
        align: 'center',
        isEditable: true,
        isNumber: true
    },
]