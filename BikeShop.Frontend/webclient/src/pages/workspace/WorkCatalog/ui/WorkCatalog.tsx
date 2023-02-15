import React from 'react';
import cls from './WorkCatalog.module.scss'
import {TagTreeView} from "../../../../widgets";

const WorkCatalog = () => {
    return (
        <div className={cls.container}>
            <div className={cls.categories}>
                <TagTreeView/>
            </div>
            <div className={cls.tableBox}>

            </div>
        </div>
    );
};

export default WorkCatalog;
