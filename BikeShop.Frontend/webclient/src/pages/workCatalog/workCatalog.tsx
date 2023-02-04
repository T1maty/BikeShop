import React from 'react';
import ProductTreeView from '../../widgets/productTreeView/ProductTreeView';
import stl from './workCatalog.module.css';

const WorkCatalog = () => {
  return (
    <div className={stl.container}>
      <ProductTreeView />
    </div>
  );
};

export default WorkCatalog;
