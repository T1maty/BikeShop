import React, {ReactElement, useRef} from 'react'
import s from './PrintModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import {useReactToPrint} from 'react-to-print'
import {useSnackbar} from 'notistack'

interface PrintModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    children: ReactElement
}

export const PrintModal: React.FC<PrintModalProps> = ({open, setOpen, children}) => {

    const {enqueueSnackbar} = useSnackbar()

    const componentRef = useRef<HTMLDivElement>(null)

    const printDocumentHandler = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: "@page { size: 2.5in 4in }",
        onAfterPrint: () => {
            enqueueSnackbar('Печать выполнена', {variant: 'success', autoHideDuration: 3000})
        },
    })

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div className={s.printModal_mainBox}>
                <div className={s.printModal_buttons}>
                    <Button onClick={printDocumentHandler}>
                        Печать
                    </Button>
                </div>
                <div className={s.printModal_content} ref={componentRef}>
                    <div className={s.scrollWrapper}>
                        {children}
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}