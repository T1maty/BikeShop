// import React, {ReactElement, useRef, cloneElement} from 'react'
// import s from './CheckModal.module.scss'
// import {Button, CustomModal} from '../../shared/ui'
// import useCheckModal from "./CheckModalStore"
// import ReactToPrint, {useReactToPrint} from "react-to-print"
// import {CheckForShop} from "../../widgets";
//
// interface CheckModalProps {
//     children: ReactElement
//     buttonName?: string
// }
//
// // основа для модалок АКТов (на примере модалки чека магазина - CheckForShop)
// export const CheckModalBasic: React.FC<CheckModalProps> = ({children, buttonName}) => {
//
//     const open = useCheckModal(s => s.openCheckModal)
//     const setOpen = useCheckModal(s => s.setOpenCheckModal)
//
//     const componentRef = useRef<HTMLDivElement>(null)
//
//     const printDocumentHandler = useReactToPrint({
//         // @ts-ignore
//         content: () => componentRef.current,
//         pageStyle: 'print',
//         onAfterPrint: () => {alert('Печать успешно завершена')},
//     })
//
//     const clonedChildren = cloneElement(children, {
//         onClick: setOpen,
//     })
//
//     return (
//         <>
//             {clonedChildren}
//
//             {/*{*/}
//             {/*    <Button onClick={() => {setOpen(true)}}>*/}
//             {/*        {buttonName}*/}
//             {/*    </Button>*/}
//             {/*}*/}
//
//             <CustomModal
//                 open={open}
//                 onClose={() => {setOpen(false)}}
//             >
//                 <div className={s.checkModal_mainBox}>
//                     <div className={s.checkModal_buttons}>
//                         <Button onClick={printDocumentHandler}>
//                             Печать
//                         </Button>
//                         <Button onClick={() => {}}>
//                             JPG
//                         </Button>
//                         {/*<Button onClick={() => {}}>*/}
//                         {/*    PDF*/}
//                         {/*</Button>*/}
//                     </div>
//
//                     <div className={s.checkModal_content} ref={componentRef}>
//                         <div className={s.scrollWrapper}>
//                             <CheckForShop/>
//                         </div>
//                     </div>
//                 </div>
//             </CustomModal>
//         </>
//     )
// }

export default {}