import React, {useEffect} from 'react';
import {CustomTable} from "shared/ui/CustomTable/CustomTable";
import {testTableData} from "../hooks/testTableData";
import {useWorkCatalog} from "../model/store/TableCatalogStore";
import {CustomTagTreeView} from "../../../../shared/ui/CustomTagTreeView/CustomTagTreeView";
import cls from "../../../../pages/workspace/WorkCatalog/ui/WorkCatalog.module.scss";


export const Catalog = () => {
    const {theadData} = testTableData()
    const {works, group, getWork, getGroup, chooseMethod, isLoading} = useWorkCatalog(state => state)

    useEffect(() => {
        getGroup()
    }, [])

    const onContext = (data: object) => {
        console.log(data)
    }
    const callBackDataTreeView = (data: object) => {
        console.log(data)
    }

    return <>
        <div className={cls.categories}>
            <CustomTagTreeView data={group}
                               selectId={getWork}
                               callBackData={callBackDataTreeView}/>
        </div>
        <div className={cls.tableBox}>
            <CustomTable tbodyData={works}
                         theadData={theadData}
                         onContext={onContext}
                         isLoading={isLoading}
            />
        </div>
    </>
};
