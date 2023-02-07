import React from 'react';
import stl from './workCatalog.module.css';
import {ProductTreeView} from "../../../widgets";

const WorkCatalog = () => {
    return (
        <div className={stl.container}>
            <ProductTreeView/>
        </div>
    );
};

export default WorkCatalog;
