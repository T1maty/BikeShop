import React, {ChangeEvent, useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import {Button} from "../../../shared/ui"
import useEditProductCardModal from "./EditProductCardModalStore"
import {ProductImage} from '../../../entities'

export const EditProductCardGallery = () => {

    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const galleryImages = useEditProductCardModal(s => s.galleryImages)
    const setGalleryImages = useEditProductCardModal(s => s.setGalleryImages)
    const uploadNewImage = useEditProductCardModal(s => s.uploadNewImage)

    const [currentImageKey, setCurrentImageKey] = useState<any>(null)

    // тестовые данные
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

    // загрузка изображения
    const uploadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            // перепроверить максимальный размер файла
            if (file.size < 7000000) {
                convertFileToBase64(file, (file64: string) => {
                    addImageHandler(file64) // добавить изображение в стор
                    // uploadNewImage(file64) // запрос на загрузку
                    console.log('file64: ', file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    // функции для изображения
    const setImageHandler = (imgKey: number) => {
        setCurrentImageKey(imgKey)
    }

    const addImageHandler = (newImage: string) => {
        const imageObj = {
            id: Date.now(),
            createdAt: '',
            updatedAt: '',
            enabled: true,
            productId: currentProduct.product.id,
            sortOrder: 0,
            url: newImage,
        }
        setGalleryImages([imageObj, ...galleryImages])
    }

    const deleteImageHandler = (imgId: number) => {
        setGalleryImages(galleryImages.filter(img => img.id !== imgId))
        setCurrentImageKey(null)
    }

    const onMoveBackwardHandler = (imgKey: number) => {
        if (imgKey === 0) return
        const items = [...galleryImages]
        const index = imgKey - 1
        const itemAbove = items[index]
        items[imgKey - 1] = items[imgKey]
        items[imgKey] = itemAbove
        console.log(items)
        setGalleryImages(items)
        setCurrentImageKey(null)
    }

    const onMoveForwardHandler = (imgKey: number) => {
        const items = [...galleryImages]
        if (imgKey === items.length - 1) return
        const index = imgKey + 1
        const itemBelow = items[index]
        items[imgKey + 1] = items[imgKey]
        items[imgKey] = itemBelow
        setGalleryImages(items)
        setCurrentImageKey(null)
    }

    return (
        <div className={s.leftSide_imageGallery}>
            <div className={s.imageGallery_imageList}>
                {
                    galleryImages.length === 0 ? <div>Фотографий нет</div> :

                        galleryImages.map((img: ProductImage, key: number) => {
                            return (
                                <div key={img.id}
                                     onDoubleClick={() => {setImageHandler(key)}}
                                     className={s.imageList_item}
                                >
                                    <img className={currentImageKey === key ? s.active_image : ''}
                                         src={img.url} alt="img-thumbnail"
                                         // src={img.thumbnail} alt="img-thumbnail"
                                    />
                                    <div className={s.imageList_imageCount}>
                                        {key + 1}/{galleryImages.length}
                                    </div>
                                    <img src={RemoveIcon} alt="remove-icon"
                                         className={s.imageList_deleteItem}
                                         onClick={() => {deleteImageHandler(img.id)}}
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
                        disabled={currentImageKey === null || currentImageKey === (galleryImages.length - 1)}
                        onClick={() => {onMoveForwardHandler(currentImageKey)}}
                    >
                        Переместить вперёд
                    </Button>
                </div>
                <div className={s.imageGallery_addImage}>
                    <input type="file" id="file"
                           accept="image/png, image/jpeg"
                           onChange={uploadImageHandler}
                           className={s.inputFile}
                    />
                </div>
            </div>
        </div>
    )
}