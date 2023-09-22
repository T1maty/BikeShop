import React from 'react';
import useCardCatalogStore from "../../../../pages/workspace/CardCatalog/CardCatalogStore";

const ProductCatalogTablePaggination = () => {
    const catalogState = useCardCatalogStore(s => s.catalogState)

    console.log(catalogState!.totalPages)
    return (
        <div>
            {Array.from({length: catalogState ? catalogState.totalPages : 0}).map((_, index) => (
                <div key={index}>Div #{index + 1}</div>
            ))}
        </div>
    );
};

export default ProductCatalogTablePaggination;