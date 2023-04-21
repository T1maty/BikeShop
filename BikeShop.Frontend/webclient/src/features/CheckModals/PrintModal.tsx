import React, {useRef} from 'react'
import s from './CheckModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import {useReactToPrint} from 'react-to-print'

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
    children: React.ReactElement
}

// основа для модалок актов
export const PrintModal = (props: Props) => {

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
            open={props.open}
            onClose={() => {
                props.setOpen(false)
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
                        {props.children}
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}