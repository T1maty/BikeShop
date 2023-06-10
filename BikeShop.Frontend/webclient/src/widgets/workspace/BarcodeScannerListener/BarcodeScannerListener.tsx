import React from 'react'
import {useBarcode} from "../../../app/providers/BarcodeScannerListenerProvider/useBarcode";

export const BarcodeScannerListener = (props: { onBarcodeRead: (barcode: string) => void }) => {
    const lastBarcode = useBarcode(s => s.lastBarcode)

    return (
        <div>

        </div>
    );
};