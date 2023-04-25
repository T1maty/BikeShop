import {UniTableColumn} from "../../../entities"

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
        isNumber: true,
        isEditable: true
    },
    {
        id: 'quantityUnitName',
        label: 'Единица изменения',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'price',
        label: 'Цена',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'discount',
        label: 'Скидка',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'total',
        label: 'Всего',
        minWidth: 70,
        align: 'left',
    },
]