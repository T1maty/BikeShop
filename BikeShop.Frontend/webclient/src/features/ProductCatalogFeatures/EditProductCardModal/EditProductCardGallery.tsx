import React, {ChangeEvent, useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import {Button} from "../../../shared/ui"
import useEditProductCardModal from "./EditProductCardModalStore"
import {ProductImage} from '../../../entities'
import {$api} from "../../../shared"
import {ConfirmModal} from '../../ConfirmModal/ConfirmModal';
import useConfirmModal from '../../ConfirmModal/ConfirmModalStore';

interface ProductCardGalleryProps {
    images: ProductImage[]
    setImages: (value: ProductImage[]) => void
}

export const EditProductCardGallery = (props: ProductCardGalleryProps) => {

    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const setOpenConfirmModal = useConfirmModal(s => s.setOpenConfirmModal)

    const [currentImageKey, setCurrentImageKey] = useState<any>(null)

    // загрузка изображения
    const uploadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 7000000) {
                let formData = new FormData();
                formData.append('imageFile', file)
                $api.post(`/product/addimagetoproduct?productId=${currentProduct.product.id}`, formData).then((r) => {
                    props.setImages([...props.images, r.data])
                }).catch((r) => {
                    console.log(r)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    // функции для работы с текущими изображениями
    const setImageHandler = (imgKey: number) => {
        setCurrentImageKey(imgKey)
    }

    const deleteImageHandler = (imgId: number) => {
        $api.post(`/product/deleteimage?imageId=${imgId}`).then((r) => {
            console.log(imgId, r)
            props.setImages(props.images.filter((img: ProductImage) => img.id !== imgId))
            setCurrentImageKey(null)
        }).catch((r) => {
            console.log(r)
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

    return (
        <div className={s.leftSide_imageGallery}>

            <ConfirmModal title={'Вы действительно хотите удалить изображение?'} extraCallback={deleteImageHandler}/>

            <div className={s.imageGallery_imageList}>
                {
                    props.images?.length === 0 ? <div>Фотографий нет</div> :

                        props.images?.map((img: ProductImage, key: number) => {
                            return (
                                <div key={img.id}
                                     className={s.imageList_item}
                                     onDoubleClick={() => {setImageHandler(key)}}
                                >
                                    <img className={currentImageKey === key ? s.active_image : ''}
                                         src={img.url} alt="img-thumbnail"
                                    />
                                    <div className={s.imageList_imageCount}>
                                        {key + 1}/{props.images.length}
                                    </div>
                                    <img src={RemoveIcon} alt="remove-icon"
                                         className={s.imageList_deleteItem}
                                         onClick={() => {setOpenConfirmModal(true)}}
                                         // onClick={() => {deleteImageHandler(img.id)}}
                                    />
                                </div>
                            )
                        })
                }
            </div>
            <div className={s.imageGallery_buttons}>
                <div className={s.imageGallery_sortButtons}>
                    <Button disabled={currentImageKey === null || currentImageKey === 0}
                            onClick={() => {onMoveBackwardHandler(currentImageKey)}}
                    >
                        Переместить назад
                    </Button>
                    <Button
                        disabled={currentImageKey === null || currentImageKey === (props.images.length - 1)}
                        onClick={() => {onMoveForwardHandler(currentImageKey)}}
                    >
                        Переместить вперёд
                    </Button>
                </div>
                <div className={s.imageGallery_addImage}>
                    <input type="file" id="file"
                           accept="image/png, image/jpeg"
                           onChange={(v) => {uploadImageHandler(v)}}
                           className={s.inputFile}
                    />
                </div>
            </div>
        </div>
    )
}