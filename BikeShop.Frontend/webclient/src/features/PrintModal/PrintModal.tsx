import React, {ReactElement, useRef} from 'react'
import s from './PrintModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import {useReactToPrint} from 'react-to-print'
import {useSnackbar} from 'notistack'
import * as htmlToImage from 'html-to-image';

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

    const jpgHandler = () => {
        htmlToImage.toJpeg(document.getElementById('my-node')!, {quality: 0.95})
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }

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
                    <Button onClick={jpgHandler}>
                        JPG
                    </Button>

                </div>
                <div className={s.printModal_content} ref={componentRef}>
                    <div id={"my-node"} className={s.scrollWrapper}>
                        {children}
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}