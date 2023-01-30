import React from 'react';
import ProductTreeView from "../../widgets/productTreeView/ProductTreeView";
import ProductCatalogTable from "../../widgets/productCatalogTable/productCatalogTable";
import stl from './workCatalog.module.css'

const WorkCatalog = () => {
    return (
        <div className={stl.container}>
            <ProductTreeView/>
            <ProductCatalogTable/>
        </div>
    );
};

export default WorkCatalog;