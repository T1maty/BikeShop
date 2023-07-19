import React from 'react';
import {ContextMenu} from "../../../widgets";
import {LocalStorage, SupplyInvoiceAPI} from "../../../entities";
import useSupplyInvoiceArchiveModal from "./SupplyInvoiceArchiveModalStore";
import {useSnackbar} from "notistack";
import useSupplyInvoice from "../../../pages/workspace/ProductsCount/SupplyInvoice/models/SupplyInvoiceStore";
import {SupplyInvoice} from "../../../entities/entities/Acts/SupplyInvoice/SupplyInvoice";
import ProductStickerManager from "../../ProductStickerManager/ProductStickerManager";
import useProductStickerManager from "../../ProductStickerManager/ProductStickerManagerStore";
import {usePriceManager} from "../../PriceManagerModal/PricaManagerModalStore";
import PriceManagerModal from "../../PriceManagerModal/PriceManagerModal";

interface p {
    open: { o: boolean, x: number, y: number },
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

export const SupplyInvoiceArchiveModalContext = (props: p) => {

    const selectedSupplyInvoice = useSupplyInvoiceArchiveModal(s => s.selectedSupplyInvoice)
    const setArchive = useSupplyInvoiceArchiveModal(s => s.setArchive)
    const archive = useSupplyInvoiceArchiveModal(s => s.archive)
    const setCurrentSupplyInvoice = useSupplyInvoice(s => s.setCurrentSupplyInvoice)
    const setManagerOpen = useProductStickerManager(s => s.setOpen)
    const setPriceManager = usePriceManager(s => s.setOpen)
    const setProductsToPriceManager = usePriceManager(s => s.setProductsFromSupply)


    const {enqueueSnackbar} = useSnackbar()

    const settings = [
        {
            name: 'Применить акт прихода',
            click: () => {
                if (selectedSupplyInvoice!.supplyInvoice.sypplyActStatus === 'Created')
                    SupplyInvoiceAPI.execute(selectedSupplyInvoice!.supplyInvoice.id, LocalStorage.userId()!).then(() => {
                        setArchive(archive.map((n) => {
                            if (n.supplyInvoice.id === selectedSupplyInvoice!.supplyInvoice.id) return {
                                ...selectedSupplyInvoice!,
                                supplyInvoice: {...selectedSupplyInvoice!.supplyInvoice, sypplyActStatus: 'Executed'}
                            }
                            else return n
                        }))
                        setCurrentSupplyInvoice(
                            {
                                supplyInvoiceProducts: [], supplyInvoice: {
                                    shopId: 1,
                                    user: LocalStorage.userId()!,
                                    description: '',
                                    additionalPrice: 0,
                                    deliveryPrice: 0
                                } as unknown as SupplyInvoice
                            }
                        )
                        enqueueSnackbar('Накладная применена!', {variant: 'success', autoHideDuration: 3000})
                    }).catch(() => {
                        enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
                    })
                else enqueueSnackbar('Нельзя применить уже примененный приход', {
                    variant: 'warning',
                    autoHideDuration: 3000
                })
            }
        },
        {
            name: 'Менеджер стикеров',
            click: () => {
                setManagerOpen(true)
            }
        },
        {
            name: 'Менеджер цен',
            click: () => {
                setPriceManager(true)
                setProductsToPriceManager(selectedSupplyInvoice!.supplyInvoiceProducts)
            }
        }
    ]
    return (
        <>
            <PriceManagerModal/>
            <ProductStickerManager items={selectedSupplyInvoice ? selectedSupplyInvoice.supplyInvoiceProducts : []}/>
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