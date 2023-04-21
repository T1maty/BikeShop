import React, {useRef} from 'react'
import s from './CheckModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import useCheckModal from './CheckModalStore'
import {useReactToPrint} from 'react-to-print'
import {CheckForServiceWork, CheckForShop} from '../../widgets'

interface CheckModalProps {
    // triggerCheckForShop?: boolean
    // triggerCheckForService?: boolean
}

// основа для модалок актов
export const CheckModalBasic: React.FC<CheckModalProps> = () => {

    const open = useCheckModal(s => s.openCheckModal)
    const setOpen = useCheckModal(s => s.setOpenCheckModal)

    const triggerCheckForShop = useCheckModal(s => s.triggerCheckForShop)
    const setTriggerCheckForShop = useCheckModal(s => s.setTriggerCheckForShop)
    const triggerCheckForService = useCheckModal(s => s.triggerCheckForService)
    const setTriggerCheckForService = useCheckModal(s => s.setTriggerCheckForService)

    const componentRef = useRef<HTMLDivElement>(null)

    const printDocumentHandler = useReactToPrint({
        // @ts-ignore
        content: () => componentRef.current,
        pageStyle: 'print',
        onAfterPrint: () => {
            alert('Печать успешно завершена')
        },
    })


    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
                setTriggerCheckForShop(false)
                setTriggerCheckForService(false)
            }}
        >
            <div className={s.checkModal_mainBox}>
                <div className={s.checkModal_buttons}>
                    <Button onClick={printDocumentHandler}>
                        Печать
                    </Button>
                    {/*<Button onClick={() => {}}>*/}
                    {/*    JPG*/}
                    {/*</Button>*/}
                    {/*<Button onClick={() => {}}>*/}
                    {/*    PDF*/}
                    {/*</Button>*/}
                </div>

                <div className={s.checkModal_content} ref={componentRef}>
                    <div className={s.scrollWrapper}>
                        {triggerCheckForShop && <CheckForShop/>}
                        {triggerCheckForService && <CheckForServiceWork/>}
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}