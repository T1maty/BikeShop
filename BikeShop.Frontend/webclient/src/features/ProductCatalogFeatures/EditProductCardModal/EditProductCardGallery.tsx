import React, {ChangeEvent, useState} from 'react'
import s from "./EditProductCardGallery.module.scss"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import {Button, LoaderScreen} from '../../../shared/ui'
import useEditProductCardModal from "./EditProductCardModalStore"
import {ProductCardAPI, ProductImage} from '../../../entities'
import {ConfirmModal} from '../../ConfirmModal/ConfirmModal'
import {useSnackbar} from "notistack"

interface ProductCardGalleryProps {
    images: ProductImage[]
    setImages: (value: ProductImage[]) => void
}

export const EditProductCardGallery = (props: ProductCardGalleryProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const isLoading = useEditProductCardModal(s => s.isLoading)
    const setIsLoading = useEditProductCardModal(s => s.setIsLoading)

    const [currentImageKey, setCurrentImageKey] = useState<any>(null)
    const [confirm, setConfirm] = useState(false);

    // загрузка изображения
    const uploadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 7000000) {
                let formData = new FormData();
                console.log(file)
                formData.append('imageFile', file)

                setIsLoading(true)
                ProductCardAPI.uploadNewImage(formData, currentProduct.product.id).then((res) => {
                    props.setImages([...props.images, res.data])
                    setIsLoading(false)
                    enqueueSnackbar('Фотография загружена', {variant: 'success', autoHideDuration: 3000})
                }).catch((error) => {
                    setIsLoading(false)
                    enqueueSnackbar('Ошибка загрузки', {variant: 'error', autoHideDuration: 3000})
                }).finally(() => {
                    setIsLoading(false)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
                setIsLoading(false)
                enqueueSnackbar('Файл слишком большого размера', {variant: 'error', autoHideDuration: 3000})
            }
        }
    }

    // функции для работы с текущими изображениями
    const setImageHandler = (imgKey: number) => {
        setCurrentImageKey(imgKey)
    }

    const deleteImageHandler = (imgId: number) => {
        setIsLoading(true)
        ProductCardAPI.deleteImage(imgId).then((res) => {
            console.log('id from function', imgId, res)
            props.setImages(props.images.filter((img: ProductImage) => img.id !== imgId))
            // setCurrentImageKey(null)
            setIsLoading(false)
            enqueueSnackbar('Фотография удалена', {variant: 'success', autoHideDuration: 3000})
        }).catch((error) => {
            setIsLoading(false)
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const onMoveBackwardHandler = (imgKey: number) => {
        if (imgKey === 0) return
        const items = [...props.images]
        const index = imgKey - 1
        const itemAbove = items[index]
        items[imgKey - 1] = items[imgKey]
        items[imgKey] = itemAbove
        props.setImages(items)
        setCurrentImageKey(null)
    }

    const onMoveForwardHandler = (imgKey: number) => {
        const items = [...props.images]
        if (imgKey === items.length - 1) return
        const index = imgKey + 1
        const itemBelow = items[index]
        items[imgKey + 1] = items[imgKey]
        items[imgKey] = itemBelow
        props.setImages(items)
        setCurrentImageKey(null)
    }

    console.log(props.images)

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <div className={s.imageGallery}>
                <div className={s.imageGallery_imageList}>
                    {
                        props.images?.length === 0 ? <div className={s.emptyList}>Фотографий нет</div> :

                            props.images?.map((img: ProductImage, key: number) => {
                                return (
                                    <div key={img.id}
                                         className={s.imageList_item}
                                         onDoubleClick={() => {
                                             setImageHandler(key)
                                         }}
                                    >
                                        <img className={currentImageKey === key ? s.active_image : ''}
                                             src={img.url} alt="img-thumbnail"
                                        />

                                        <div className={s.imageList_imageCount}>
                                            {key + 1}/{props.images.length}
                                        </div>

                                        <img src={RemoveIcon} alt="remove-icon"
                                             className={s.imageList_deleteItem}
                                            // onClick={() => {
                                            //     setConfirm(true)
                                            // }}
                                             onClick={() => {
                                                 deleteImageHandler(img.id);
                                                 console.log('id from click', img.id)
                                             }}
                                        />
                                        <ConfirmModal title={'Вы действительно хотите удалить изображение?'}
                                                      extraCallback={() => {
                                                          deleteImageHandler(img.id);
                                                          console.log('id from click', img.id)
                                                      }}
                                                      open={confirm} setOpen={setConfirm}
                                        />

                                    </div>
                                )
                            })
                    }
                </div>

                <div className={s.imageGallery_buttons}>
                    <div className={s.imageGallery_sortButtons}>
                        <Button disabled={currentImageKey === null || currentImageKey === 0}
                                onClick={() => {
                                    onMoveBackwardHandler(currentImageKey)
                                }}
                        >
                            Переместить назад
                        </Button>
                        <Button
                            disabled={currentImageKey === null || currentImageKey === (props.images.length - 1)}
                            onClick={() => {
                                onMoveForwardHandler(currentImageKey)
                            }}
                        >
                            Переместить вперёд
                        </Button>
                    </div>
                    <div className={s.imageGallery_addImage}>
                        <input type="file" id="file"
                               accept="image/png, image/jpeg"
                               onChange={(v) => {
                                   uploadImageHandler(v)
                               }}
                               className={s.inputFile}
                        />
                    </div>
                </div>
            </div>
        )
    }
}