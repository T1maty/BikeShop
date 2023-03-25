import React, {useEffect} from 'react'
import s from './EditProductCardModal.module.scss'
import {Modal} from '@mui/material'
import useEditProductCardModal from './EditProductCardModalStore'
import {Button} from '../../../shared/ui'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import draftToHtml from 'draftjs-to-html'
import EditProductCardSpecifications from "./EditProductCardSpecifications";
import EditProductCardOption from "./EditProductCardOption";
import EditProductCardDescription from "./EditProductCardDescription";
import EditProductCardGallery from "./EditProductCardGallery";
import EditProductCardTags from "./EditProductCardTags";

interface EditProductCardModalProps {
    productCardData?: any
}

export const EditProductCardModal: React.FC<EditProductCardModalProps> = ({productCardData}) => {

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)
    const getCardOptions = useEditProductCardModal(s => s.getCardOptions)
    const getSpecifications = useEditProductCardModal(s => s.getSpecifications)


    // console.log('editorState => ', draftToHtml(convertToRaw(editorState.getCurrentContent())))

    // const [galleryImages, setGalleryImages] = useState([
    //     {id: '1', thumbnail: 'https://picsum.photos/id/1018/250/150/'},
    //     {id: '2', thumbnail: 'https://picsum.photos/id/1015/250/150/'},
    //     {id: '3', thumbnail: 'https://picsum.photos/id/1019/250/150/'},
    //     {id: '4', thumbnail: 'https://picsum.photos/id/1018/250/150/'},
    //     {id: '5', thumbnail: 'https://picsum.photos/id/1015/250/150/'},
    //     {id: '6', thumbnail: 'https://picsum.photos/id/1019/250/150/'},
    //     {id: '7', thumbnail: 'https://picsum.photos/id/1018/250/150/'},
    //     {id: '8', thumbnail: 'https://picsum.photos/id/1015/250/150/'},
    //     {id: '9', thumbnail: 'https://picsum.photos/id/1019/250/150/'},
    // ])


    // ----------------------------------- //

    // const formControl = useForm<any>({
    //     defaultValues: {
    //         option: '',
    //         specification: '',
    //     }
    // })
    //
    // const onSubmit: SubmitHandler<any> = (data: any) => {
    //     // тестовые данные
    //     const newDetail = {id: '555', name: 'New Characteristic', description: data.detail}
    //     setSpecifications([newDetail, ...specifications])
    //
    //     // добавление карточки
    //     //     addNewService(data).then((res: any) => {
    //     //         setIsCreating(false)
    //     //         enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
    //     //     }).catch((error: any) => {
    //     //         let message = error(error.response.data.errorDescription).toString()
    //     //         formControl.setError('name', {type: 'serverError', message: message})
    //     //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
    //     //         console.error(error.response.data)
    //     //     })
    // }

    // ----------------------------------- //

    // функция для подсчёта длины массива в массиве
    // const arrayOfLength = (array: any[]) => {
    //     let length = array.map(num => num.length)
    //     // console.log(length)
    //     return length
    // }
    // arrayOfLength(cardOptions.map(el => el.optionVariants))


    // загрузка изображения


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
                    <EditProductCardOption/>
                    <EditProductCardSpecifications/>
                    {
                        //////////////////////////////////////
                    }

                    <div className={s.rightSide_mainButtons}>
                        <Button onClick={() => {
                            setOpen(false)
                        }}>
                            Отмена
                        </Button>
                        <Button onClick={() => {
                        }}>
                            Сохранить
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}