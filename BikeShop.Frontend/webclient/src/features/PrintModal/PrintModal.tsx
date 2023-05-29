import React, {ReactElement, useRef} from 'react'
import s from './PrintModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import {useReactToPrint} from 'react-to-print'
import {useSnackbar} from 'notistack'
import * as htmlToImage from 'html-to-image';
import {PrintAPI} from "../../entities/api/Acts/PrintAPI";
import {PrintSettings} from "../../entities/models/PrintSettings";

interface PrintModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    children: ReactElement
    id?: number
    finaly?: () => void
}

export const PrintModal: React.FC<PrintModalProps> = ({open, setOpen, children, id, finaly}) => {

    const {enqueueSnackbar} = useSnackbar()

    const componentRef = useRef<HTMLDivElement>(null)

    const printDocumentHandler = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: "@page { size: 2.5in 4in }",
        onAfterPrint: () => {
            enqueueSnackbar('Печать выполнена', {variant: 'success', autoHideDuration: 3000})
            finaly ? finaly() : false
        },
    })

    const jpgHandler = () => {
        htmlToImage.toJpeg(document.getElementById('my-node')!, {quality: 0.95})
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
                finaly ? finaly() : false
            });
    }

    const pngHandler = () => {
        htmlToImage.toPng(document.getElementById('my-node')!, {quality: 1, pixelRatio: 3})
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.png';
                link.href = dataUrl;
                link.click();
                finaly ? finaly() : false
            });
    }

    function dataURLtoFile(dataurl: string, filename: string) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)![1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        finaly ? finaly() : false
        return new File([u8arr], filename, {type: mime});
    }

    const agent = () => {
        htmlToImage.toPng(document.getElementById('my-node')!, {quality: 1, pixelRatio: 3})
            .then(function (dataUrl) {
                let file = dataURLtoFile(dataUrl, "ActImage")
                console.log(file)
                let settings: PrintSettings = {copies: 1, pageWight: 500, printerName: "Win2Image"}
                let formData = new FormData();
                formData.append('imageFile', file)
                PrintAPI.addQueue(formData,
                    id ? id : 0,
                    "Bill",
                    JSON.stringify(settings),
                    100,
                    1)
            }).then(n => {
            finaly ? finaly() : false
            enqueueSnackbar('Отправлено на печать агентом', {variant: 'success', autoHideDuration: 3000})
        });
    }

    const PDF = () => {

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
                    <Button onClick={pngHandler}>
                        PNG
                    </Button>
                    <Button onClick={agent}>
                        Печать агентом
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