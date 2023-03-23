import React from 'react';
import cls from './WorkCatalog.module.scss'
import {Catalog} from "../../../../widgets/workspace/WorkCatalog/Catalog";

export const WorkCatalog = () => {
    return (
        <div className={cls.container}>
            <Catalog/>
        </div>
    );
};

