// import React, {ReactNode, ChangeEvent} from 'react'
// import s from './ProductsCountStyles.module.scss'
// import {Button} from '../../../shared/ui'
//
// type ProductsWrapperProps = {
//     title: string
//     isUploadFile: boolean
//     children: ReactNode
// }
//
// export const ProductsWrapper: React.FC<ProductsWrapperProps> = ({title, isUploadFile, children}) => {
//
//     const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length) {
//             const file = e.target.files[0]
//             console.log('file: ', file)
//         }
//     }
//
//     return (
//         <div className={s.arrivalOfProducts_mainBlock}>
//             <div className={s.arrivalOfProducts_leftSide}>
//                 <div className={s.leftSide_title}>{title}</div>
//                 {
//                     isUploadFile ?
//                     <div className={s.leftSide_uploadFile}>
//                         <input type='file' id='file' onChange={uploadHandler} className={s.inputFile}/>
//                     </div>
//                         : ''
//                 }
//                 <div className={s.leftSide_info}>Дополнительная информация</div>
//                 <Button buttonDivWrapper={s.button_chooseItem} onClick={() => {}}>
//                     Выбрать товар
//                 </Button>
//                 <div className={s.leftSide_delivery}>
//                     <div>Доставка</div>
//                     <div>Расходы</div>
//                 </div>
//                 <div className={s.leftSide_metrika}>
//                     <div className={s.metrika_title}>Метрика:</div>
//                     <div>Позиций: 999</div>
//                     <div>Товаров: 999</div>
//                     <div>Приходная сумма: 99999</div>
//                     <div>Расходы: 99</div>
//                     <div>Итого: 99999999</div>
//                 </div>
//                 <div className={s.leftSide_footerButtons}>
//                     <Button buttonDivWrapper={s.button_save} onClick={() => {}}>
//                         Сохранить акт
//                     </Button>
//                     <Button buttonDivWrapper={s.button_cancel} onClick={() => {}}>
//                         Отмена
//                     </Button>
//                 </div>
//             </div>
//
//             {children}
//         </div>
//     )
// }

export default {}