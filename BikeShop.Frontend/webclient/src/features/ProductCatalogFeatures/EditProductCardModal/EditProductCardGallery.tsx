import React, {ChangeEvent, useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import {Button} from "../../../shared/ui"
import useEditProductCardModal from "./EditProductCardModalStore"
import {ProductImage} from '../../../entities'
import {Controller, UseFormReturn} from "react-hook-form"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const EditProductCardGallery = (props: ControlledProps) => {

    const currentProduct = useEditProductCardModal(s => s.currentProduct)

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
    const uploadImageHandler = (e: ChangeEvent<HTMLInputElement>, field: any) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            // перепроверить максимальный размер файла
            if (file.size < 7000000) {
                convertFileToBase64(file, (file64: string) => {
                    addImageHandler(file64, field) // добавить изображение в стор
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

    // функции для работы с текущими изображениями
    const setImageHandler = (imgKey: number) => {
        setCurrentImageKey(imgKey)
    }

    const addImageHandler = (newImage: string, field: any) => {
        const imageObj = {
            id: Date.now(),
            createdAt: '',
            updatedAt: '',
            enabled: true,
            productId: currentProduct.product.id,
            sortOrder: 0,
            url: newImage,
        }
        field.onChange([imageObj, ...field.value])
    }

    const deleteImageHandler = (imgId: number, field: any) => {
        field.onChange(field.value.filter((img: any) => img.id !== imgId))
        setCurrentImageKey(null)
    }

    const onMoveBackwardHandler = (imgKey: number, field: any) => {
        if (imgKey === 0) return
        const items = [...field.value]
        const index = imgKey - 1
        const itemAbove = items[index]
        items[imgKey - 1] = items[imgKey]
        items[imgKey] = itemAbove
        field.onChange(items)
        setCurrentImageKey(null)
    }

    const onMoveForwardHandler = (imgKey: number, field: any) => {
        const items = [...field.value]
        if (imgKey === items.length - 1) return
        const index = imgKey + 1
        const itemBelow = items[index]
        items[imgKey + 1] = items[imgKey]
        items[imgKey] = itemBelow
        field.onChange(items)
        setCurrentImageKey(null)
    }

    return (
        <Controller
            name={props.name}
            control={props.control.control}
            render={({field}: any) =>

                <div className={s.leftSide_imageGallery}>
                    <div className={s.imageGallery_imageList}>
                        {
                            field.value.length === 0 ? <div>Фотографий нет</div> :

                                field.value.map((img: ProductImage, key: number) => {
                                    return (
                                        <div key={img.id}
                                             className={s.imageList_item}
                                             onDoubleClick={() => {setImageHandler(key)}}
                                        >
                                            <img className={currentImageKey === key ? s.active_image : ''}
                                                 src={img.url} alt="img-thumbnail"
                                                // src={img.thumbnail} alt="img-thumbnail"
                                            />
                                            <div className={s.imageList_imageCount}>
                                                {key + 1}/{field.value.length}
                                            </div>
                                            <img src={RemoveIcon} alt="remove-icon"
                                                 className={s.imageList_deleteItem}
                                                 onClick={() => {deleteImageHandler(img.id, field)}}
                                            />
                                        </div>
                                    )
                                })
                        }
                    </div>
                    <div className={s.imageGallery_buttons}>
                        <div className={s.imageGallery_sortButtons}>
                            <Button disabled={currentImageKey === null || currentImageKey === 0}
                                    onClick={() => {onMoveBackwardHandler(currentImageKey, field)}}
                            >
                                Переместить назад
                            </Button>
                            <Button
                                disabled={currentImageKey === null || currentImageKey === (field.value.length - 1)}
                                onClick={() => {onMoveForwardHandler(currentImageKey, field)}}
                            >
                                Переместить вперёд
                            </Button>
                        </div>
                        <div className={s.imageGallery_addImage}>
                            <input type="file" id="file"
                                   accept="image/png, image/jpeg"
                                   onChange={(v) => {uploadImageHandler(v, field)}}
                                   className={s.inputFile}
                            />
                        </div>
                    </div>
                </div>
            }
        />
    )
}