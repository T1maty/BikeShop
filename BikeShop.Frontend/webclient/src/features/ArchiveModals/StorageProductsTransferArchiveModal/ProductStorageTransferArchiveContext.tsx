import React from 'react';
import {useSnackbar} from "notistack";
import {ContextMenu} from "../../../widgets";
import useStorageProductsTransferArchiveModalStore from "./StorageProductsTransferArchiveModalStore";

interface p {
    open: { o: boolean, x: number, y: number },
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

export const ProductStorageTransferArchiveContext = (props: p) => {
    const {enqueueSnackbar} = useSnackbar()
    const {toTransfer, execute} = useStorageProductsTransferArchiveModalStore(s => s)

    const settings = [
        {
            name: 'В путь',
            click: () => {

                toTransfer(() => {
                    enqueueSnackbar('Отправлено в путь', {variant: 'success', autoHideDuration: 3000})

                }, () => {
                    enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
                })
            }
        },
        {
            name: 'Применить акт',
            click: () => {
                execute(() => {
                    enqueueSnackbar('Акт применен', {variant: 'success', autoHideDuration: 3000})
                }, () => {
                    enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
                })
            }
        },
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