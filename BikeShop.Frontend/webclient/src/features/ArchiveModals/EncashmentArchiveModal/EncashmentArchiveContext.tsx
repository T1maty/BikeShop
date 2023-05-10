import React from 'react';
import {ContextMenu} from "../../../widgets";
import {useSnackbar} from "notistack";
import useEncashmentArchiveModal from "./EncashmentArchiveModalStore";
import {EncashmentAPI, LocalStorage} from "../../../entities";

interface p {
    open: { o: boolean, x: number, y: number },
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

export const EncashmentArchiveContext = (props: p) => {

    const {enqueueSnackbar} = useSnackbar()
    const selected = useEncashmentArchiveModal(s => s.selected)
    const archive = useEncashmentArchiveModal(s => s.archive)
    const setArchive = useEncashmentArchiveModal(s => s.setArchive)


    const settings = [
        {
            name: 'Назначить статус В ПУТИ',
            click: () => {
                EncashmentAPI.setStatusToTransfer(selected!.id, LocalStorage.userId()!).then(n => {
                    enqueueSnackbar('Статус изменен', {variant: 'success', autoHideDuration: 3000})
                    setArchive(archive.map(d => {
                        if (d.id === n.data.id) return n.data
                        else return d
                    }))
                })
            }
        },
        {
            name: 'Назначить статус ГОТОВО',
            click: () => {
                EncashmentAPI.setStatusToFinish(selected!.id, LocalStorage.userId()!).then(n => {
                    enqueueSnackbar('Статус изменен', {variant: 'success', autoHideDuration: 3000})
                    setArchive(archive.map(d => {
                        if (d.id === n.data.id) return n.data
                        else return d
                    }))
                })
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