import React, {useEffect} from 'react';
import {useWorkCatalog} from "./TableCatalogStore";
import {CustomTagTreeView} from "../../../shared/ui/CustomTagTreeView/CustomTagTreeView";
import cls from "../../../pages/workspace/WorkCatalog/ui/WorkCatalog.module.scss";
import {WorkCatalogTable} from "./WorkCatalogTable";


export const Catalog = () => {
    const contextDataTreeView = ['Редактировать', 'Создать в корне', 'Создать потомка', 'Переместить', 'Удалить']

    const {group, getWork, getGroup} = useWorkCatalog(state => state)

    useEffect(() => {
        getGroup()
    }, [])


    return <>
        <div className={cls.categories}>
            <CustomTagTreeView data={group}
                               selectId={getWork}
                               callBackData={(data) => {
                               }}
                               contextData={contextDataTreeView}
            />
        </div>
        <div className={cls.tableBox}>
            <WorkCatalogTable/>
        </div>
    </>
};
