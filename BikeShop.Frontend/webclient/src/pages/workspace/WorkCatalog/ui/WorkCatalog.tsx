import React from 'react';
import cls from './WorkCatalog.module.scss'
import {TagTreeView} from "../../../../widgets";
import {CustomTable} from "../../../../shared/ui/CustomTable/CustomTable";

const WorkCatalog = () => {

    const theadData = ["Артикул", "Название", "Цена", "Описание"];

    const tbodyData = [
        {
            id: "1",
            items: ["John", "john@email.com", "01/01/2021"]
        },
        {
            id: "2",
            items: ["Sally", "sally@email.com", "12/24/2020"]
        },
        {
            id: "3",
            items: ["Maria", "maria@email.com", "12/01/2020"]
        },
    ]
    const tbodydata2 =  [
        {
            "name": "Work 1",
            "description": "Work description 1",
            "price": 228,
            "workGroupId": 1,
            "id": 1,
            "createdAt": "2023-02-09T23:16:59.3102303",
            "updatedAt": "2023-02-09T23:16:59.3102304",
            "enabled": true
        },
        {
            "name": "Work 2",
            "description": "Work description 2",
            "price": 300,
            "workGroupId": 1,
            "id": 2,
            "createdAt": "2023-02-09T23:16:59.3102313",
            "updatedAt": "2023-02-09T23:16:59.3102313",
            "enabled": true
        },
        {
            "name": "Work 1",
            "description": "Work description 1",
            "price": 228,
            "workGroupId": 1,
            "id": 3,
            "createdAt": "2023-02-09T23:16:59.3102303",
            "updatedAt": "2023-02-09T23:16:59.3102304",
            "enabled": true
        },
        {
            "name": "Work 2",
            "description": "Work description 2",
            "price": 300,
            "workGroupId": 1,
            "id": 4,
            "createdAt": "2023-02-09T23:16:59.3102313",
            "updatedAt": "2023-02-09T23:16:59.3102313",
            "enabled": true
        }
        ,{
            "name": "Work 1",
            "description": "Work description 1",
            "price": 228,
            "workGroupId": 1,
            "id": 5,
            "createdAt": "2023-02-09T23:16:59.3102303",
            "updatedAt": "2023-02-09T23:16:59.3102304",
            "enabled": true
        },
        {
            "name": "Work 2",
            "description": "Work description 2",
            "price": 300,
            "workGroupId": 1,
            "id": 6,
            "createdAt": "2023-02-09T23:16:59.3102313",
            "updatedAt": "2023-02-09T23:16:59.3102313",
            "enabled": true
        },
    ]

    return (
        <div className={cls.container}>
            <div className={cls.categories}>
                <TagTreeView/>
            </div>
            <div className={cls.tableBox}>
                <CustomTable tbodyData={tbodydata2} theadData={theadData}/>
            </div>
        </div>
    );
};

export default WorkCatalog;
