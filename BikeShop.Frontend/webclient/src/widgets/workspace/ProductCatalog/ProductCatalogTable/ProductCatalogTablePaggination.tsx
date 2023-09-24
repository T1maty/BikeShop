import React from 'react';
import useCardCatalogStore from "../../../../pages/workspace/CardCatalog/CardCatalogStore";
import s from '../../../../pages/workspace/CardCatalog/CardCatalog.module.scss'

const ProductCatalogTablePaggination = () => {
    const catalogState = useCardCatalogStore(s => s.catalogState)
    const selectedPage = useCardCatalogStore(s => s.selectedPage)
    const setSelectedPage = useCardCatalogStore(s => s.setSelectedPage)

    let pages: number[] = Array.from({length: catalogState ? catalogState.totalPages : 0}).map((r, index) => index + 1).filter(n => n > selectedPage - 5 && n < selectedPage + 5)
    return (
        <>
            <div className={s.pag_item}
                 onClick={() => {
                     if ((selectedPage - 1) > 0) setSelectedPage(selectedPage - 1)
                 }}>{"<"}</div>
            {pages.map((page) => (
                <div key={page} className={s.pag_item}
                     style={selectedPage === page ? {backgroundColor: "#707070", cursor: "default"} : {}}
                     onClick={() => {
                         setSelectedPage(page)
                     }}>{page}</div>
            ))}
            <div className={s.pag_item}
                 onClick={() => {
                     if ((selectedPage + 1) <= catalogState!.totalPages) setSelectedPage(selectedPage + 1)
                 }}>{">"}</div>
        </>
    );
};

export default ProductCatalogTablePaggination;