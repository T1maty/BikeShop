import React from 'react';
import {Button, CustomModal} from "../../../shared/ui";
import s from "./Service.module.scss";

interface p {
    open: boolean,
    setOpen: (n: boolean) => void

    onSuccess: (isInstant: boolean) => void
}

const InstantServiceModal = (props: p) => {
    return (
        <CustomModal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
        >
            <div className={s.InstantWrapper}>
                <Button onClick={() => {
                    props.onSuccess(false)
                    props.setOpen(false)
                }} className={s.InstantYes}>Ремонт сразу (Без печати)</Button>
                <Button className={s.InstantNo} onClick={() => {
                    props.onSuccess(true)
                    props.setOpen(false)
                }}>Оставляем технику (Печать документов)</Button>
            </div>
        </CustomModal>
    );
};

export default InstantServiceModal;