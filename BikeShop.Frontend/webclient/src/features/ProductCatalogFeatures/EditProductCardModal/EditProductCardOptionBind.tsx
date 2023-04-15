import React, {useState} from 'react'
import s from "./EditProductCardOptionBind.module.scss"
import {
    Product,
    ProductCardAPI,
    ProductFullData,
    ProductImage,
    ProductOption,
    ProductOptionVariant,
    ProductOptionVariantBind
} from "../../../entities"
import {Controller, UseFormReturn} from "react-hook-form";
import {Button} from "../../../shared/ui";
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg";
import Select from "react-select";
import useEditProductCardModal from "./EditProductCardModalStore";
import Enumerable from "linq";
import {ChooseProductModal} from "../../ChooseProductModal/ChooseProductModal";
import {ProductTagBindDTO} from "./models/ProductTagBindDTO";
import {ChooseProductTagModal} from "../AddProductCardTagModal/AddProductCardTagModal";
import {useSnackbar} from "notistack";

interface ProductCardOptionBindProps {
    product: ProductFullData
    control: UseFormReturn<any>
    images: ProductImage[]
    setImages: (value: ProductImage[]) => void
}

export const EditProductCardOptionBind = (props: ProductCardOptionBindProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const [selectedOption, setSelectedOption] = useState<any>(null)
    const [v, sV] = useState(false)
    const [v2, sV2] = useState<{ id: number, state: boolean }[]>([])
    const allOptions = useEditProductCardModal(s => s.allOptions)

    const addVariantHandler = (control: any, product: Product) => {
        let value = control.getValues('productOptions')
        let r = selectedOption.optionVariants.filter((n: ProductOptionVariant) => !Enumerable.from(control.getValues('productOptions') as ProductOptionVariantBind[]).select(m => m.optionVariantId).contains(n.id))[0]

        let variant: ProductOptionVariantBind
        variant = {
            productId: product.id,
            id: 0,
            name: r.name,
            optionId: r.optionId,
            optionVariantId: r.id,
            optionName: r.optionName,
            createdAt: Date.now().toString(),
            sortOrder: 0,
            updatedAt: Date.now().toString(),
            enabled: true,
        }

        control.setValue('productOptions', [...value, variant])
        setSelectedOption(null)
    }

    const availableOptions = (control: any, product: Product) => {
        let enumr = Enumerable.from(control.getValues('productOptions') as ProductOptionVariantBind[])
        let options = allOptions.filter((n: ProductOption) => !(enumr.where(m => m.productId == product.id).select(m => m.optionId).contains(n.id)))
        return options.filter(n => enumr.where(m => m.optionId == n.id).toArray().length < n.optionVariants.length)
    }

    const addProductBind = (product: Product, field: any) => {
        if (Enumerable.from(field.value as Product[]).select(n => n.id).contains(product.id)) {
            enqueueSnackbar('Этот товар уже в бинде', {
                variant: 'warning',
                autoHideDuration: 3000
            })
            return
        }
        ProductCardAPI.getProductCardById(product.id).then((r) => {
            let productCard = r.data
            if (productCard.product.id == product.id && productCard.bindedProducts.length === 1) {
                let optionsIds = Enumerable.from(props.control.getValues('productOptions') as ProductOptionVariantBind[]).select(n => n.optionVariantId).toArray()
                let tagIds = Enumerable.from(props.control.getValues('productTags') as ProductTagBindDTO[]).select(n => n.productTag.id).toArray()

                productCard.productOptions.forEach(n => {
                    if (!optionsIds.includes(n.optionVariantId)) {
                        optionsIds.push(n.optionVariantId)
                        props.control.setValue('productOptions', [...props.control.getValues('productOptions'), n])
                        console.log('слияние опции', n)
                    }

                })

                productCard.productTags.forEach((n) => {
                    if (!tagIds.includes(n.productTag.id)) {
                        tagIds.push(n.productTag.id)
                        props.control.setValue('productTags', [...props.control.getValues('productTags'), n])
                        console.log('слияние тега', n)
                    }
                })

                productCard.productImages.forEach((n) => {
                    props.control.setValue('productImages', [...props.control.getValues('productImages'), n])
                    props.setImages([...props.images, n])
                    console.log('слияние image', n)
                })

                field.onChange([...field.value, productCard.product])

                enqueueSnackbar('Бинд добавлен', {
                    variant: 'success',
                    autoHideDuration: 3000
                })

                sV(false)
            } else {
                enqueueSnackbar('Этот товар уже в бинде', {
                    variant: 'warning',
                    autoHideDuration: 3000
                })
            }
        })

    }

    return (
        <Controller
            name={"bindedProducts"}
            control={props.control.control}
            render={({field}: any) =>


                <div className={s.editProductCardOptionBind}>

                    <ChooseProductModal addData={(product) => {

                        addProductBind(product, field)
                    }} open={v} setOpen={sV}/>


                    <Button buttonDivWrapper={s.addButton}
                            onClick={() => {
                                sV(true)
                            }}
                    >
                        Добавить бинд товара
                    </Button>
                    {
                        field.value?.map((bindedProduct: Product, index: number) => {
                            return (
                                <>
                                    <div className={s.optionBind_productBlock}>
                                        <div className={s.productBlock_control}>
                                            <div className={s.contentBlock_deleteImg}>
                                                {index > 0 ?
                                                    <img src={RemoveIcon} alt="remove-icon" onClick={() => {
                                                        field.onChange(field.value.filter((n: Product) => n.id != bindedProduct.id))
                                                        props.control.setValue('productOptions', props.control.getValues('productOptions').filter((n: ProductOptionVariantBind) => n.productId != bindedProduct.id))
                                                        props.control.setValue('productTags', props.control.getValues('productTags').filter((n: ProductTagBindDTO) => n.productId != bindedProduct.id))
                                                        props.setImages(props.images.filter(n => n.productId != bindedProduct.id))
                                                    }}/>
                                                    : <div></div>
                                                }
                                            </div>

                                            <div className={s.productImage}>
                                                <img
                                                    src={props.images?.filter((n) => n.productId == bindedProduct.id)[0]?.url}
                                                    alt="product-image"/>

                                                {index > 0 ? <div>
                                                    <div className={s.imageGallery_addImage}>
                                                        <input type="file" id="file"
                                                               accept="image/png, image/jpeg"
                                                               onChange={(e) => {
                                                                   let id = props.images?.filter((n) => n.productId == bindedProduct.id)[0]?.id

                                                                   if (e.target.files && e.target.files.length) {
                                                                       const file = e.target.files[0]
                                                                       if (file.size < 7000000) {
                                                                           let formData = new FormData();
                                                                           formData.append('imageFile', file)
                                                                           ProductCardAPI.uploadNewImage(formData, bindedProduct.id).then((r) => {
                                                                               if (id != undefined) {
                                                                                   ProductCardAPI.deleteImage(id).then(() => {
                                                                                       props.setImages([...props.images.filter(n => n.id != id), r.data])
                                                                                   })
                                                                               } else {
                                                                                   props.setImages([...props.images, r.data])
                                                                               }

                                                                           })

                                                                       } else {
                                                                           console.error('Error: ', 'Файл слишком большого размера')
                                                                       }
                                                                   }
                                                               }}
                                                               className={s.inputFile}
                                                        />
                                                    </div>

                                                    <Button onClick={() => {
                                                        let id = props.images?.filter((n) => n.productId == bindedProduct.id)[0]?.id
                                                        ProductCardAPI.deleteImage(id).then(() => {
                                                            props.setImages(props.images.filter(n => n.id != id))
                                                        })
                                                    }}>Удалить картинку</Button>
                                                </div> : <></>}
                                            </div>

                                        </div>


                                        <div className={s.productBlock_productContent}>
                                            <div className={s.productContent_info}>
                                                ID: {bindedProduct.id} {'|'} {''}
                                                {bindedProduct.name} {'|'} {''}
                                                Catalog Key: {bindedProduct.catalogKey}
                                            </div>
                                            <div className={s.productContent_contentBlock}>
                                                <div className={s.contentBlock_content}>
                                                    <div className={s.content_options}>
                                                        <fieldset className={s.options_wrapperBox}>
                                                            <legend>Опции</legend>
                                                            <Controller
                                                                key={index}
                                                                name={'productOptions'}
                                                                control={props.control.control}
                                                                render={({field}: any) =>
                                                                    <>
                                                                        {
                                                                            props.control.getValues('productOptions')?.filter((n: ProductOptionVariantBind) => n.productId === bindedProduct.id).map((variant: ProductOptionVariantBind) => {
                                                                                return (
                                                                                    <div key={index}>
                                                                                        {variant.optionName}
                                                                                        <Button onClick={() => {
                                                                                            field.onChange(field.value.filter((n: ProductOptionVariantBind) => n.optionId != variant.optionId || n.productId != bindedProduct.id))
                                                                                        }}>удалить</Button>
                                                                                        <Select
                                                                                            key={index}
                                                                                            className={s.options_search}
                                                                                            options={(allOptions.filter(n => n.id == variant.optionId)[0]?.optionVariants
                                                                                                .filter(n => !Enumerable.from(field.value as ProductOptionVariantBind[]).select(m => m.optionVariantId).contains(n.id)) as ProductOptionVariantBind[])}
                                                                                            placeholder={'Варианты'}
                                                                                            onChange={(newValue) => {
                                                                                                let r = newValue as ProductOptionVariant
                                                                                                let base = field.value as ProductOptionVariantBind[]

                                                                                                let variant: ProductOptionVariantBind
                                                                                                variant = {
                                                                                                    productId: bindedProduct.id,
                                                                                                    id: 0,
                                                                                                    name: r.name,
                                                                                                    optionId: r.optionId,
                                                                                                    optionVariantId: r.id,
                                                                                                    optionName: r.optionName,
                                                                                                    sortOrder: 0,
                                                                                                    enabled: true,
                                                                                                    createdAt: Date.now().toString(),
                                                                                                    updatedAt: Date.now().toString(),
                                                                                                }

                                                                                                let target = base.filter((n: ProductOptionVariantBind) => n.productId === bindedProduct.id)
                                                                                                    .filter((n: ProductOptionVariantBind) => n.optionId === newValue?.optionId)[0]
                                                                                                let ind = base.indexOf(target)
                                                                                                base[ind] = variant
                                                                                                field.onChange(base)
                                                                                                console.log(variant)
                                                                                            }}
                                                                                            isSearchable={true}
                                                                                            defaultValue={variant}
                                                                                            getOptionLabel={label => label!.name}
                                                                                            getOptionValue={value => value!.name}
                                                                                            noOptionsMessage={() => 'Доступных вариантов нету'}
                                                                                        />
                                                                                        <br/>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }

                                                                        <div className={s.options_selectRow}>

                                                                            <div className={s.options_select}>
                                                                                <Select
                                                                                    className={s.options_search}
                                                                                    options={availableOptions(props.control, bindedProduct)}
                                                                                    placeholder={'Опции'}
                                                                                    isSearchable={true}
                                                                                    value={selectedOption}
                                                                                    onChange={(value: any) => {
                                                                                        setSelectedOption(value)
                                                                                    }}
                                                                                    getOptionLabel={label => label!.name}
                                                                                    getOptionValue={value => value!.name}
                                                                                    noOptionsMessage={() => 'Опция не найдена'}
                                                                                />
                                                                            </div>
                                                                            <Button
                                                                                buttonDivWrapper={s.options_addButton}
                                                                                onClick={() => {
                                                                                    addVariantHandler(props.control, bindedProduct)
                                                                                }}
                                                                                disabled={selectedOption === null || props.control.getValues('productOptions').filter((n: ProductOptionVariantBind) => n.productId == bindedProduct.id).find((n: ProductOptionVariantBind) => n.optionId == selectedOption.id) != undefined}
                                                                            >
                                                                                +
                                                                            </Button>
                                                                        </div>
                                                                    </>}/>
                                                            <br/>
                                                        </fieldset>
                                                    </div>

                                                    <div className={s.content_tags}>
                                                        <fieldset className={s.tags_wrapperBox}>
                                                            <legend>Теги</legend>

                                                            <Button buttonDivWrapper={s.tags_addButton}
                                                                    onClick={() => {
                                                                        sV2([...v2.filter(n => n.id != bindedProduct.id), {
                                                                            id: bindedProduct.id,
                                                                            state: true
                                                                        }])
                                                                    }}
                                                            >
                                                                +
                                                            </Button>

                                                            <Controller
                                                                key={index}
                                                                name={"productTags"}
                                                                control={props.control.control}
                                                                render={({field}: any) =>
                                                                    <>
                                                                        <div className={s.tags_list}>
                                                                            <ChooseProductTagModal
                                                                                key={index}
                                                                                open={v2.find((n) => n.id == bindedProduct.id)?.state as boolean}
                                                                                setOpen={(value) => {
                                                                                    sV2([...v2.filter(n => n.id != bindedProduct.id), {
                                                                                        id: bindedProduct.id,
                                                                                        state: value
                                                                                    }])
                                                                                }}
                                                                                onTagDoubleClick={(tag) => {
                                                                                    sV2([...v2.filter(n => n.id != bindedProduct.id), {
                                                                                        id: bindedProduct.id,
                                                                                        state: false
                                                                                    }])
                                                                                    if (!Enumerable.from(field.value as ProductTagBindDTO[]).select(n => n.productTag.id).contains(tag.id)) {
                                                                                        field.onChange([...field.value, {
                                                                                            productTag: tag,
                                                                                            productId: bindedProduct.id
                                                                                        } as ProductTagBindDTO])
                                                                                    } else {
                                                                                        enqueueSnackbar('Такой тег уже есть у товара', {
                                                                                            variant: 'warning',
                                                                                            autoHideDuration: 3000
                                                                                        })
                                                                                    }

                                                                                }
                                                                                }/>
                                                                            {field.value?.filter((n: ProductTagBindDTO) =>
                                                                                n.productId == bindedProduct.id
                                                                            ).map((n: ProductTagBindDTO, index: number) => {

                                                                                return (
                                                                                    <div className={s.tags_listItem}
                                                                                         key={index}>
                                                                                        {n.productTag.name}
                                                                                        <Button onClick={() => {
                                                                                            field.onChange(field.value.filter((m: ProductTagBindDTO) => m.productTag.id != n.productTag.id))
                                                                                        }}>х</Button>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </>}/>


                                                        </fieldset>
                                                    </div>
                                                </div>
                                                {/*<div className={s.contentBlock_deleteImg}>*/}
                                                {/*    <img src={RemoveIcon} alt="remove-icon" onClick={() => {}}/>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>
                                    {/*<Button buttonDivWrapper={s.optionBind_addButton}*/}
                                    {/*        onClick={() => {}}*/}
                                    {/*>*/}
                                    {/*    Добавить бинд товара*/}
                                    {/*</Button>*/}
                                    <br/>
                                </>
                            )
                        })
                    }
                </div>

            }
        />

    )
}