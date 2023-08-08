import React from 'react';
import {ContextMenu} from "../../../widgets";

import {useSnackbar} from "notistack";
import useSupplyInvoice from "../../../pages/workspace/ProductsCount/SupplyInvoice/models/SupplyInvoiceStore";
import useProductStickerManager from "../../ProductStickerManager/ProductStickerManagerStore";
import {usePriceManager} from "../../PriceManagerModal/PricaManagerModalStore";

interface p {
    open: { o: boolean, x: number, y: number },
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

export const OutcomeActArchiveModalContext = (props: p) => {

    const setCurrentSupplyInvoice = useSupplyInvoice(s => s.setCurrentSupplyInvoice)
    const setManagerOpen = useProductStickerManager(s => s.setOpen)
    const setPriceManager = usePriceManager(s => s.setOpen)
    const setProductsToPriceManager = usePriceManager(s => s.setProductsFromSupply)


    const {enqueueSnackbar} = useSnackbar()

    const settings = [
        {
            name: 'Применить акт',
            click: () => {

            }
        }
    ]
    return (
        <>
            <ContextMenu
                isOpen={props.open.o}
                onClose={() => {
                    //setManagerOpen(false)
                    props.setOpen({o: false, x: 0, y: 0});
                }}
                settings={settings}
                top={props.open.y}
                left={props.open.x}
            />
        </>
    );
};