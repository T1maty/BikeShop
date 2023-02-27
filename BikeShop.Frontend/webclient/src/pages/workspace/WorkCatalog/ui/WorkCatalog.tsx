import React from 'react';
import cls from './WorkCatalog.module.scss'
import {TagTreeView} from "../../../../widgets";
import {Catalog} from "../../../../widgets/workspace/TableCatalog";

const WorkCatalog = () => {


    return (
        <div className={cls.container}>
            <div className={cls.categories}>
                {/*<TagTreeView/>*/}
            </div>
            <div className={cls.tableBox}>
                <Catalog/>
            </div>
            {/*<Modal/>*/}
        </div>
    );
};

export default WorkCatalog;
