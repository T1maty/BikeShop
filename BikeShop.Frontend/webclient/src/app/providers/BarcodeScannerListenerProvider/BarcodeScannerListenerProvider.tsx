import {memo, useEffect} from "react";
import {useBarcode} from "./useBarcode";

interface props {
    children: JSX.Element
    onBarcodeRead: (barcode: string) => void
}

export const BarcodeScannerListenerProvider = memo((props: props) => {
    const sb = useBarcode(s => s.setBarcode)

    const h = (event: KeyboardEvent) => {
        //console.log(event.key, event.key.length)
        if (event.key.length === 1 || event.key === 'Enter')
            sb(event.key, props.onBarcodeRead)
    }

    useEffect(() => {
        window.addEventListener('keydown', h);
        return (() => {
            window.removeEventListener('keydown', h)
        })
    }, [])

    console.log('listener Loaded')

    return (
        <>
            {props.children}
        </>
    );
});

