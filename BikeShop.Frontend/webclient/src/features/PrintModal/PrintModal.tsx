import React, {ReactElement, useRef, useState} from 'react'
import s from './PrintModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import {useReactToPrint} from 'react-to-print'
import {useSnackbar} from 'notistack'
import * as htmlToImage from 'html-to-image';
import {PrintAPI} from "../../entities/api/Acts/PrintAPI";
import {Loader} from "../../shared/ui/Loader/Loader";
import html2canvas from "html2canvas";
import {useApp} from "../../entities/globalStore/AppStore";
import {IPrintNameEnum, PrintNameEnum} from "../../entities/enumerables/PrintNameEnum";

interface PrintModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    children: ReactElement
    id: number
    finaly?: () => void,
    printAgentName: IPrintNameEnum
    copies?: number
}

export const PrintModal: React.FC<PrintModalProps> = ({
                                                          open,
                                                          setOpen,
                                                          children,
                                                          id,
                                                          finaly,
                                                          printAgentName,
                                                          copies
                                                      }) => {

    const {enqueueSnackbar} = useSnackbar()

    const componentRef = useRef<HTMLDivElement>(null)

    const [isLoading, setIsLoading] = useState(false)
    const AgentPrintBill = useApp(s => s.AgentPrintBill)
    const AgentPrintProductSticker = useApp(n => n.AgentPrintProductSticker)
    const AgentPrintServiceIncomeAct = useApp(n => n.AgentPrintServiceIncomeAct)
    const AgentPrintServiceOutcomeSmallAct = useApp(n => n.AgentPrintServiceOutcomeSmallAct)
    const AgentPrintServiceOutcomeFullAct = useApp(n => n.AgentPrintServiceOutcomeFullAct)
    const AgentPrintServiceSticker = useApp(n => n.AgentPrintServiceSticker)
    const AgentPrintEncashment = useApp(n => n.AgentPrintEncashment)


    function saveComponentAsImage() {

        window.scrollTo(0, 0);
        html2canvas(componentRef.current!, {
            scrollY: -window.scrollY,

        }).then(function (canvas) {
            var img = canvas.toDataURL();
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = img;
            link.click();

        });
    }

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
        htmlToImage.toPng(componentRef.current!, {
            quality: 1,
            pixelRatio: 3
        })
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
        console.log('PrintDataName: ', printAgentName)
        console.log('PrintDataId: ', id)

        if (printAgentName === PrintNameEnum.AgentPrintBill) {
            AgentPrintBill(id, 1)
            enqueueSnackbar('Отправленно на печать', {variant: 'success', autoHideDuration: 3000})
            return
        }
        if (printAgentName === PrintNameEnum.AgentPrintProductSticker) {
            AgentPrintProductSticker(id, 1)
            enqueueSnackbar('Отправленно на печать', {variant: 'success', autoHideDuration: 3000})
            return
        }
        if (printAgentName === PrintNameEnum.AgentPrintServiceIncomeAct) {
            AgentPrintServiceIncomeAct(id, 1)
            enqueueSnackbar('Отправленно на печать', {variant: 'success', autoHideDuration: 3000})
            return
        }
        if (printAgentName === PrintNameEnum.AgentPrintServiceOutcomeSmallAct) {
            AgentPrintServiceOutcomeSmallAct(id, 1)
            enqueueSnackbar('Отправленно на печать', {variant: 'success', autoHideDuration: 3000})
            return
        }
        if (printAgentName === PrintNameEnum.AgentPrintServiceOutcomeFullAct) {
            AgentPrintServiceOutcomeFullAct(id, 1)
            enqueueSnackbar('Отправленно на печать', {variant: 'success', autoHideDuration: 3000})
            return
        }
        if (printAgentName === PrintNameEnum.AgentPrintServiceSticker) {
            AgentPrintServiceSticker(id, 1)
            enqueueSnackbar('Отправленно на печать', {variant: 'success', autoHideDuration: 3000})
            return
        }
        if (printAgentName === PrintNameEnum.AgentPrintEncashment) {
            AgentPrintEncashment(id, 1)
            enqueueSnackbar('Отправленно на печать', {variant: 'success', autoHideDuration: 3000})
            return
        }

        setIsLoading(true)
        htmlToImage.toPng(componentRef.current!, {quality: 1, pixelRatio: 3})
            .then(function (dataUrl) {
                let file = dataURLtoFile(dataUrl, "ActImage")
                console.log(file)
                //let settings: PrintSettings = {copies: 1, pageWight: 501, printerName: "Win2Image"}
                let settings: string = ""
                if (copies != undefined) settings = `{"copies": ${copies},"pageWight": 0,"printerName": ""}`
                let formData = new FormData();
                formData.append('imageFile', file)
                PrintAPI.addQueue(formData,
                    id ? id : 0,
                    printAgentName ? printAgentName : '',
                    settings,
                    100,
                    1).then(n => {
                    enqueueSnackbar('Отправлено на печать агентом', {variant: 'success', autoHideDuration: 3000})
                })
            }).finally(() => {
            finaly != undefined ? finaly() : false
            setIsLoading(false)
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

                {isLoading ? <Loader variant={"ellipsis"}/> :
                    <div className={s.printModal_buttons}>
                        <Button onClick={printDocumentHandler}>
                            Печать
                        </Button>
                        <Button onClick={saveComponentAsImage}>
                            JPG
                        </Button>
                        <Button onClick={
                            pngHandler}>
                            PNG
                        </Button>
                        <Button onClick={agent}>
                            Печать агентом
                        </Button>

                    </div>
                }
                <div className={s.printModal_content}>
                    <div id={"my-node"} className={s.scrollWrapper} ref={componentRef}>
                        {children}
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}