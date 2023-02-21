import React from 'react';
import cls from './WorkCatalog.module.scss'
import {TagTreeView} from "../../../../widgets";
import {TableCatalog} from "../../../../widgets/workspace/TableCatalog";

const WorkCatalog = () => {

    // const setModalTrue = ....
    return (
        <div className={cls.container}>
            <div className={cls.categories}>
                <TagTreeView/>
            </div>
            <div className={cls.tableBox}>
                <TableCatalog onContext={(data: any) => console.log(data)}/>
            </div>
            {/*<Modal/>*/}
        </div>
    );
};

export default WorkCatalog;
