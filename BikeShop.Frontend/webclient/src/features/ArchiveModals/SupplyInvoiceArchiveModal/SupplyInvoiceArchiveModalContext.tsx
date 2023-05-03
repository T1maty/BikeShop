import React from 'react';
import {ContextMenu} from "../../../widgets";

interface p {
    open: { o: boolean, x: number, y: number },
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

export const SupplyInvoiceArchiveModalContext = (props: p) => {
    const settings = [
        {
            name: 'Применить акт прихода',
            click: () => {

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