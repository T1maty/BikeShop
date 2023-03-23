import React from 'react';
import cls from './WorkCatalog.module.scss'
import {WorkCatalogTreeView} from "../../../../widgets/workspace/WorkCatalog/WorkCatalogTreeView";

export const WorkCatalog = () => {
    return (
        <div className={cls.container}>
            <WorkCatalogTreeView/>
        </div>
    );
};

