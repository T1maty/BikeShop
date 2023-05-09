import {BarcodeScannerListener} from "../../../widgets"
import {memo, useEffect} from "react";
import {useBarcode} from "./useBarcode";

interface props {
    children: JSX.Element
}

export const BarcodeScannerListenerProvider = memo((props: props) => {

    //const [barcode, setBarcode] = useState('')

    const sb = useBarcode(s => s.setBarcode)

    const h = (event: KeyboardEvent) => {
        sb(event.key)
    }

    useEffect(() => {
        window.addEventListener('keydown', h);
        return (() => {
            window.removeEventListener('keydown', h)
        })
    }, [])

    console.log('listener Loaded')

    return (
        <div>
            <BarcodeScannerListener/>
            {props.children}
        </div>
    );
});

