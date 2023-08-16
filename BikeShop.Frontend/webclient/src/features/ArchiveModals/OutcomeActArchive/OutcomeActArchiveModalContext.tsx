import React from 'react';
import {ContextMenu} from "../../../widgets";

import {useSnackbar} from "notistack";
import useOutcomeActArchiveModal from "./OutcomeActArchiveModalStore";

interface p {
    open: { o: boolean, x: number, y: number },
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

export const OutcomeActArchiveModalContext = (props: p) => {

    const ex = useOutcomeActArchiveModal(s => s.executeHandler)

    const {enqueueSnackbar} = useSnackbar()

    const settings = [
        {
            name: 'Применить акт',
            click: () => {
                ex(() => {
                    enqueueSnackbar('Акт применен', {variant: 'success', autoHideDuration: 3000})
                }, () => {
                    //enqueueSnackbar('Ошибка', {variant: 'error', autoHideDuration: 3000})
                })
                props.setOpen({o: false, x: 0, y: 0});
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