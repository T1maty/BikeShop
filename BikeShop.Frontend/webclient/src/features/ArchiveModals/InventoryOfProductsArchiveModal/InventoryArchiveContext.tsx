import React from 'react';
import {ContextMenu} from "../../../widgets";
import {useSnackbar} from "notistack";
import useInventoryOfProductsArchiveModal from "./InventoryOfProductsArchiveModalStore";
import {InventarizationAPI, LocalStorage} from "../../../entities";

interface p {
    open: { o: boolean, x: number, y: number },
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

export const InventoryArchiveContext = (props: p) => {

    const {enqueueSnackbar} = useSnackbar()
    const selected = useInventoryOfProductsArchiveModal(s => s.selected)
    const setLackArchive = useInventoryOfProductsArchiveModal(s => s.setLackArchive)
    const lackArchive = useInventoryOfProductsArchiveModal(s => s.lackArchive)
    const archive = useInventoryOfProductsArchiveModal(s => s.archive)
    const setArchive = useInventoryOfProductsArchiveModal(s => s.setArchive)

    const settings = [
        {
            name: 'Закрыть акт инвентаризации',
            click: () => {
                InventarizationAPI.closeAct(selected!.inventarization.id, LocalStorage.userId()!).then(n => {
                    enqueueSnackbar('Акт инвентаризации закрыт, акт недостачи создан', {
                        variant: 'success',
                        autoHideDuration: 3000
                    })
                    setLackArchive([...lackArchive, n.data])
                    setArchive(archive.map(n => {
                        if (n.inventarization.id === selected!.inventarization.id) return {
                            ...n,
                            inventarization: {...n.inventarization, status: 'Closed'}
                        }
                        else return n
                    }))
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