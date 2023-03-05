import React, {useEffect} from 'react';
import {CustomTable} from "shared/ui/CustomTable/CustomTable";
import {testTableData} from "../hooks/testTableData";
import {useWorkCatalog} from "../model/store/TableCatalogStore";
import {CustomTagTreeView} from "../../../../shared/ui/CustomTagTreeView/CustomTagTreeView";
import cls from "../../../../pages/workspace/WorkCatalog/ui/WorkCatalog.module.scss";
import useCreateWorkTagModal from "../../../../features/WorkCatalogModal/model/CreateTagModalStore";
import {CreateTagModal} from "../../../../features/WorkCatalogModal";


export const Catalog = () => {
    const contextDataTreeView = ['Редактировать', 'Создать в корне', 'Создать потомка', 'Переместить', 'Удалить']
    const contextDataTable = ['Редактировать', 'Создать', 'Статистика']
    const theadData = ["Артикул", "Название", "Цена", "Описание"]

    const setOpenId = useCreateWorkTagModal(state => state.setOpen)
    const {works, group, getWork, getGroup, chooseMethod, isLoading} = useWorkCatalog(state => state)

    useEffect(() => {
        getGroup()
    }, [])

    const callBackDataTable = (data: object) => {
        chooseMethod(data)
    }
    const callBackDataTreeView = (data: object) => {
        setOpenId(data)
    }

    return <>
        <CreateTagModal onSuccess={(data: any) => console.log(data)}/>
        <div className={cls.categories}>
            <CustomTagTreeView data={group}
                               selectId={getWork}
                               callBackData={callBackDataTreeView}
                               contextData={contextDataTreeView}
            />
        </div>
        <div className={cls.tableBox}>
            <CustomTable tbodyData={works}
                         theadData={theadData}
                         callBackData={callBackDataTable}
                         isLoading={isLoading}
                         contextData={contextDataTable}
            />
        </div>
    </>
};
