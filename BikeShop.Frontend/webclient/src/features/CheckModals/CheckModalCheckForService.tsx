import React, {useRef} from 'react'
import s from './CheckModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import useCheckModal from "./CheckModalStore"
import ReactToPrint, {useReactToPrint} from "react-to-print"
import {CheckForServiceWork} from "../../widgets"

export const CheckModalCheckForService = () => {

    const open = useCheckModal(s => s.openCheckModalForService)
    const setOpen = useCheckModal(s => s.setOpenCheckModalForService)

    const componentRef = useRef<HTMLDivElement>(null)

    const printDocumentHandler = useReactToPrint({
        // @ts-ignore
        content: () => componentRef.current,
        pageStyle: 'print',
        onAfterPrint: () => {alert('Печать успешно завершена')},
    })

    return (
        <>
            <CustomModal
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <div className={s.checkModal_mainBox}>
                    <div className={s.checkModal_buttons}>
                        <Button onClick={printDocumentHandler}>
                            Печать
                        </Button>
                        <Button onClick={() => {}}>
                            JPG
                        </Button>
                        {/*<Button onClick={() => {}}>*/}
                        {/*    PDF*/}
                        {/*</Button>*/}
                    </div>

                    <div className={s.checkModal_content} ref={componentRef}>
                        <div className={s.scrollWrapper}>
                            <CheckForServiceWork/>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </>
    )
}