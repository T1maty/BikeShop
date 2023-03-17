import React from 'react'
import {BarcodeScannerListener} from "../../../widgets"

interface props {
    children: JSX.Element
}

export const BarcodeScannerListenerProvider = (props: props) => {
    console.log('listener Loaded')
    return (
        <div onKeyDownCapture={(event) => {
            // console.log(event)
        }}>
            <BarcodeScannerListener/>
            {props.children}
        </div>
    );
};

