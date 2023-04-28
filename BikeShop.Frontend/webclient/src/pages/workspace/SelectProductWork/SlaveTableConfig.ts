import {UniTableColumn} from "../../../entities";

export const columns: UniTableColumn[] = [
    {
        id: 'workId',
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
        isEditable: true
    },
    {
        id: 'quantity',
        label: 'Кличество',
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
        isEditable: true,
        isNumber: true,
        isCurrency: true
    },
    {
        id: 'description',
        label: 'Описание',
        minWidth: 70,
        align: 'right',
        isEditable: true
    },

]