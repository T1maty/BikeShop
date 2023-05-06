import React from 'react';
import {ContextMenu} from "../../../widgets";
import {LocalStorage, SupplyInvoiceAPI} from "../../../entities";
import useSupplyInvoiceArchiveModal from "./SupplyInvoiceArchiveModalStore";
import {useSnackbar} from "notistack";
import useSupplyInvoice from "../../../pages/workspace/ProductsCount/SupplyInvoice/models/SupplyInvoiceStore";
import {SupplyInvoice} from "../../../entities/entities/Acts/SupplyInvoice/SupplyInvoice";

interface p {
    open: { o: boolean, x: number, y: number },
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

export const SupplyInvoiceArchiveModalContext = (props: p) => {

    const selectedSupplyInvoice = useSupplyInvoiceArchiveModal(s => s.selectedSupplyInvoice)
    const setArchive = useSupplyInvoiceArchiveModal(s => s.setArchive)
    const archive = useSupplyInvoiceArchiveModal(s => s.archive)
    const setCurrentSupplyInvoice = useSupplyInvoice(s => s.setCurrentSupplyInvoice)

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

            }
        }
    ]
    return (
        <>
            <ContextMenu
                isOpen={props.open.o}
                onClose={() => {
                    props.setOpen({o: false, x: 0, y: 0});
                }}
                settings={settings}
                top={props.open.y}
                left={props.open.x}
            />
        </>
    );
};