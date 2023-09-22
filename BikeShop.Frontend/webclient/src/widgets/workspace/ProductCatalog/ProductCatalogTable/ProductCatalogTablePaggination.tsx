import React from 'react';
import useCardCatalogStore from "../../../../pages/workspace/CardCatalog/CardCatalogStore";
import s from '../../../../pages/workspace/CardCatalog/CardCatalog.module.scss'

const ProductCatalogTablePaggination = () => {
    const catalogState = useCardCatalogStore(s => s.catalogState)
    const selectedPage = useCardCatalogStore(s => s.selectedPage)
    const setSelectedPage = useCardCatalogStore(s => s.setSelectedPage)
    
    return (
        <>
            <div className={s.pag_item}
                 onClick={() => {
                     if ((selectedPage - 1) > 0) setSelectedPage(selectedPage - 1)
                 }}>{"<"}</div>
            {Array.from({length: catalogState ? catalogState.totalPages : 0}).map((page, index) => (
                <div key={index} className={s.pag_item}
                     style={selectedPage === index + 1 ? {backgroundColor: "#707070", cursor: "default"} : {}}
                     onClick={() => {
                         setSelectedPage(index + 1)
                     }}>{index + 1}</div>
            ))}
            <div className={s.pag_item}
                 onClick={() => {
                     if ((selectedPage + 1) <= catalogState!.totalPages) setSelectedPage(selectedPage + 1)
                 }}>{">"}</div>
        </>
    );
};

export default ProductCatalogTablePaggination;