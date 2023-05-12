import React from 'react'
import s from './UserRoleModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import useUserRoleModal from "./UserRoleModalStore"

export const UserRoleModal = () => {

    const open = useUserRoleModal(s => s.openUserRoleModal)
    const setOpen = useUserRoleModal(s => s.setOpenUserRoleModal)

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div className={s.userRoleModal_mainBox}>
                <div className={s.userRoleModal_header}>
                    <div className={s.header_groups}>1</div>
                    <div className={s.header_roles}>2</div>
                </div>
                <div className={s.userRoleModal_bottom}>
                    <div className={s.bottom_deals}>3</div>
                    <div className={s.bottom_buttons}>4</div>
                </div>
                {/*<Button onClick={() => {*/}
                {/*    setOpen(false)*/}
                {/*}}>*/}
                {/*    Отмена*/}
                {/*</Button>*/}
            </div>
        </CustomModal>
    )
}