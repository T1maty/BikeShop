import React from 'react';
import {BarcodeScanerListener} from "../../../widgets";

interface props {
    children: JSX.Element
}

export const BarcodeScanerListenerProvider = (props: props) => {
    console.log('listener Loaded')
    return (
        <div onKeyDownCapture={(event) => {
            console.log(event)
        }}>
            <BarcodeScanerListener/>
            {props.children}
        </div>
    );
};

