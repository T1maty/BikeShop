import {UniTableColumn} from "../../../entities";

export const columns: UniTableColumn[] = [
    {
        id: 'productId',
        label: 'Артикул',
        minWidth: 70,
        align: 'right',
        isEditable: false
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
        id: 'price',
        label: 'Цена',
        minWidth: 70,
        align: 'left',
        isNumber: true,
        isCurrency: true
    },
]