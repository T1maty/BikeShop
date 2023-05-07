import {UniTableColumn} from "../../../entities"

export const columns: UniTableColumn[] = [
    {
        id: 'id',
        label: 'Артикул',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Название',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'price',
        label: 'Цена',
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
    {
        id: 'description',
        label: 'Описание',
        minWidth: 70,
        align: 'center',
    },
]