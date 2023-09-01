import React, {useState} from 'react';
import {Button, CustomInput, CustomModal} from "../../../shared/ui";

interface p {
    open: boolean,
    setOpen: (v: boolean) => void
    onConfirm: (name: string) => void
    name: string
}

const CreateOptionVariantModal = (p: p) => {
    const [input, setInput] = useState("")
    return (
        <CustomModal
            open={p.open}
            onClose={() => {
                p.setOpen(false)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
        >
            <div style={{color: "black", width: "300px"}}>
                Опция:
                <br/>
                {p.name}
                <br/>
                <br/>
                Вариант опции:
                <CustomInput color={'black'} value={input} onChange={(v) => {
                    setInput(v.target.value)
                }}/>
                <br/>
                <Button style={{width: "100%"}} children={'Создать'} onClick={() => {
                    p.onConfirm(input)
                }}/>
            </div>
        </CustomModal>
    );
};

export default CreateOptionVariantModal;