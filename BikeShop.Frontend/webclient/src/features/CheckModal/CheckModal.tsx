import React, {ReactElement} from 'react'
import s from './CheckModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import useCheckModal from "./CheckModalStore"

interface CheckModalProps {
    children: ReactElement
    name: string
}

export const CheckModal: React.FC<CheckModalProps> = ({children, name}) => {

    const open = useCheckModal(s => s.openCheckModal)
    const setOpen = useCheckModal(s => s.setOpenCheckModal)

    return (
        <>
            {
                <Button onClick={() => {setOpen(true)}}>
                    {name}
                </Button>
            }

            <CustomModal
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <div className={s.checkModal_mainBox}>
                    <div className={s.checkModal_buttons}>
                        <Button onClick={() => {}}>
                            Печать
                        </Button>
                        <Button onClick={() => {}}>
                            JPG
                        </Button>
                        <Button onClick={() => {}}>
                            PDF
                        </Button>
                    </div>

                    <div className={s.checkModal_content}>
                        <div className={s.scrollWrapper}>
                            {children}
                        </div>
                    </div>
                </div>
            </CustomModal>
        </>
    )
}