import React, {useEffect} from 'react'
import s from './EditProductCardModal.module.scss'
import {Modal} from '@mui/material'
import useEditProductCardModal from './EditProductCardModalStore'
import {Button} from '../../../shared/ui'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import draftToHtml from 'draftjs-to-html'
import {EditProductCardSpecifications} from "./EditProductCardSpecifications"
import {EditProductCardOption} from "./EditProductCardOption"
import {EditProductCardDescription} from "./EditProductCardDescription"
import {EditProductCardGallery} from "./EditProductCardGallery"
import {EditProductCardTags} from "./EditProductCardTags"
import {SubmitHandler, useForm} from "react-hook-form"
import {UpdateProductCard} from "../../../entities/models/Product/UpdateProductCard"

interface EditProductCardModalProps {
    productCardData?: any
}

export const EditProductCardModal: React.FC<EditProductCardModalProps> = ({productCardData}) => {

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)
    const getCardOptions = useEditProductCardModal(s => s.getCardOptions)
    const getSpecifications = useEditProductCardModal(s => s.getSpecifications)

    // ----------------------------------- //

    const formControl = useForm<UpdateProductCard>({
        defaultValues: {
            options: [],
            specifications: [],
        }
    })


    const onSubmit: SubmitHandler<UpdateProductCard> = (data: UpdateProductCard) => {
        console.log('submitData', data)

        // добавление карточки
        //     addNewService(data).then((res: any) => {
        //         setIsCreating(false)
        //         enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
        //     }).catch((error: any) => {
        //         let message = error(error.response.data.errorDescription).toString()
        //         formControl.setError('name', {type: 'serverError', message: message})
        //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
        //         console.error(error.response.data)
        //     })
    }

    // ----------------------------------- //

    // функция для подсчёта длины массива в массиве
    // const arrayOfLength = (array: any[]) => {
    //     let length = array.map(num => num.length)
    //     // console.log(length)
    //     return length
    // }
    // arrayOfLength(cardOptions.map(el => el.optionVariants))

    // ----------------------------------- //

    useEffect(() => {
        getCardOptions()
        getSpecifications()
    }, [])

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <div className={s.editProductCardModal_mainBlock}>
                    <div className={s.editProductCardModal_leftSide}>
                        {
                            //////////////////////////////////////
                        }
                        <EditProductCardTags productCardData={productCardData}/>
                        {
                            //////////////////////////////////////
                        }
                        <div className={s.rightSide_productStatus}>
                            Статус товара
                        </div>
                        {
                            //////////////////////////////////////
                        }
                        <EditProductCardGallery/>
                        {
                            //////////////////////////////////////
                        }
                    </div>

                    {
                        //////////////////////////////////////
                    }
                    <EditProductCardDescription/>
                    {
                        //////////////////////////////////////
                    }

                    <div className={s.editProductCardModal_rightSide}>
                        {
                            //////////////////////////////////////
                        }
                        <EditProductCardOption divClassName={s.rightSide_productDetails}
                                               control={formControl}
                                               name={'options'}
                        />
                        <EditProductCardSpecifications divClassName={s.rightSide_productOptions}
                                                       control={formControl}
                                                       name={'specifications'}
                        />
                        {
                            //////////////////////////////////////
                        }

                        <div className={s.rightSide_mainButtons}>
                            <Button onClick={() => {
                                setOpen(false)
                            }}>
                                Отмена
                            </Button>
                            <Button type={'submit'}>
                                Сохранить
                            </Button>
                        </div>
                    </div>

                </div>
            </form>
        </Modal>
    )
}