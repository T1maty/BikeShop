import {UniTableColumn} from "../../../entities"

export const columns: UniTableColumn[] = [
    {
        id: 'productId',
        label: 'Артикул',
        width: 10,
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'name',
        label: 'Название',
        width: 35,
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'quantity',
        label: 'Количество',
        width: 13,
        minWidth: 70,
        align: 'right',
        isNumber: true,
        isEditable: true
    },
    {
        id: 'quantityUnitName',
        label: 'Единица изменения',
        width: 12,
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'price',
        label: 'Цена',
        width: 10,
        minWidth: 70,
        align: 'left',
        isCurrency: true
    },
    {
        id: 'discount',
        label: 'Скидка',
        width: 10,
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'total',
        label: 'Всего',
        width: 10,
        minWidth: 70,
        align: 'left',
        isCurrency: true
    },
]