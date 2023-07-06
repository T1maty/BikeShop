import {UniTableColumn} from "../../../../../entities";

export const slaveColumns: UniTableColumn[] = [
    {
        id: 'productId',
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
        id: 'quantity',
        label: 'Количество',
        minWidth: 70,
        align: 'center',
        isEditable: true,
        isNumber: true
    },
    {
        id: 'catalogKey',
        label: 'Количество',
        minWidth: 70,
        align: 'right',
    },
]