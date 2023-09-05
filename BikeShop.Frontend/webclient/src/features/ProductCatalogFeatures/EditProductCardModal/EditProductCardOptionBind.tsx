import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './EditProductCardOptionBind.module.scss'
import {
    Product,
    ProductCardAPI,
    ProductFullData,
    ProductImage,
    ProductOption,
    ProductOptionVariant,
    ProductOptionVariantBind
} from '../../../entities'
import {Controller, UseFormReturn} from 'react-hook-form'
import {AsyncSelectSearchProduct, Button, LoaderScreen} from '../../../shared/ui'
import RemoveIcon from '../../../shared/assets/workspace/remove-icon.svg'
import Select from 'react-select'
import useEditProductCardModal from './EditProductCardModalStore'
import Enumerable from 'linq'
import {ChooseProductModal} from '../ChooseProductModal/ChooseProductModal'
import {useSnackbar} from 'notistack'
import {ProductFilterBind} from 'entities/entities/ProductFilterBind'
import {ProductFilter} from "../../../entities/entities/ProductFilter";
import {ProductOptionsWithVariants} from "./models/ProductOptionsWithVariants";
import CreateOptionVariantModal from "./CreateOptionVariantModal";

interface ProductCardOptionBindProps {
    product: ProductFullData
    control: UseFormReturn<any>
    images: ProductImage[]
    setImages: (value: ProductImage[]) => void
}

export const EditProductCardOptionBind = (props: ProductCardOptionBindProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const allOptions = useEditProductCardModal(s => s.allOptions)
    const allFilters = useEditProductCardModal(s => s.allFilters)
    const isLoading = useEditProductCardModal(s => s.isLoading)
    const setIsLoading = useEditProductCardModal(s => s.setIsLoading)
    const createOption = useEditProductCardModal(s => s.createOption)
    const addOptionVariant = useEditProductCardModal(s => s.addOptionVariant)

    const [v, sV] = useState(false)
    const [selectInput, setSelectInput] = useState('')
    const [openCreateOption, setOpenCreateOption] = useState(false)
    const [enBut, setEnBut] = useState<{ id: number, name: string } | null>(null)

    useEffect(() => {
        !openCreateOption ? setSelectInput('') : null
    }, [openCreateOption])
    const availableOptions = (control: any, product: Product) => {
        let enumr = Enumerable.from(control.getValues('productOptions') as ProductOptionVariantBind[])
        let options = allOptions.filter((n: ProductOption) => !(enumr.where(m => m.productId == product.id)
            .select(m => m.optionId).contains(n.id)))
        return options.filter(n => enumr.where(m => m.optionId == n.id).toArray().length < n.optionVariants.length)
    }

    const addVariantHandler = (control: any, product: Product, selectedOption: ProductOptionsWithVariants, justCreatedName?: string) => {
        let value = control.getValues('productOptions')
        let r: ProductOptionVariant
        if (justCreatedName != undefined) {
            r = selectedOption.optionVariants.find(n => n.name === justCreatedName)!
        } else {
            r = selectedOption.optionVariants
                .filter((n: ProductOptionVariant) => !Enumerable
                    .from(control.getValues('productOptions') as ProductOptionVariantBind[])
                    .select(m => m.optionVariantId)
                    .contains(n.id))[0]
        }


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
    }

    const onChangeOptionsVariants = (field: any, bindedProduct: Product, newValue: any) => {
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
                let optionsIds = Enumerable.from(props.control.getValues('productOptions') as ProductOptionVariantBind[])
                    .select(n => n.optionVariantId).toArray()

                productCard.productOptions.forEach(n => {
                    if (!optionsIds.includes(n.optionVariantId)) {
                        optionsIds.push(n.optionVariantId)
                        props.control.setValue('productOptions', [...props.control.getValues('productOptions'), n])
                        console.log('слияние опции', n)
                    }
                })

                productCard.productImages.forEach((n) => {
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

    const addFilter = (filter: ProductFilter) => {
        let data = props.control.getValues('productFilters') as ProductFilterBind[]

        let filterr = {
            id: 0,
            createdAt: "",
            updatedAt: "",
            enabled: true,
            productId: props.product.product.id,
            filterId: filter.id,
            name: filter.name,
            groupName: filter.groupName,
            isCollapsed: filter.isCollapsed,
            isRetailVisible: filter.isRetailVisible,
            isB2BVisible: filter.isB2BVisible,
            sortOrder: filter.sortOrder,
            groupSortOrder: filter.groupSortOrder,
        } as ProductFilterBind

        props.control.setValue('productFilters', [filterr, ...data])
    }
    const uploadBindedPhotoHandler = (e: ChangeEvent<HTMLInputElement>, bindedProduct: Product) => {
        let id = props.images?.filter((n) => n.productId == bindedProduct.id)[0]?.id

        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 7000000) {
                let formData = new FormData();
                formData.append('imageFile', file)

                setIsLoading(true)
                ProductCardAPI.uploadNewImage(formData, bindedProduct.id).then((r) => {
                    if (id != undefined) {
                        ProductCardAPI.deleteImage(id).then(() => {
                            props.setImages([...props.images.filter(n => n.id != id), r.data])
                        })
                    } else {
                        props.setImages([...props.images, r.data])
                    }
                    setIsLoading(false)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
                setIsLoading(false)
            }
        }
    }

    const deleteBindedPhotoHandler = (bindedProduct: Product) => {
        let id = props.images?.filter((n) => n.productId == bindedProduct.id)[0]?.id

        ProductCardAPI.deleteImage(id).then(() => {
            props.setImages(props.images.filter(n => n.id != id))
        })
    }

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <Controller
                name={'bindedProducts'}
                control={props.control.control}
                render={({field}: any) =>

                    <div className={s.optionBind}>


                        <ChooseProductModal open={v}
                                            setOpen={sV}
                                            addData={(product) => {
                                                addProductBind(product, field)
                                            }}
                        />
                        <div className={s.optionBind_header}>
                            <div>Группа товаров</div>

                            <div className={s.search_wrapper}>
                                <AsyncSelectSearchProduct onSelect={(p) => {
                                }}/>
                            </div>

                            <Button buttonDivWrapper={s.addBindButton} onClick={() => {
                                sV(true)
                            }}>
                                Добавить бинд товара
                            </Button>
                        </div>

                        {
                            field.value?.map((bindedProduct: Product, index: number) => {
                                return (
                                    <div className={s.optionBind_productBlock}>

                                        <div className={s.productBlock_productContent}>
                                            <div className={s.productContent_info}>
                                                ID: {bindedProduct.id} {'|'} {''}
                                                {bindedProduct.name} {'|'} {''}
                                                Catalog Key: {bindedProduct.catalogKey}
                                            </div>

                                            <div className={s.productContent_contentBlock}>
                                                {
                                                    index > 0 ?
                                                        <div className={s.productBlock_deleteBindProduct}>
                                                            <img src={RemoveIcon}
                                                                 alt="remove-icon"
                                                                 onClick={() => {
                                                                     //deleteBindedProductHandler(field, bindedProduct)
                                                                 }}
                                                            />
                                                        </div> : ''
                                                }
                                                <div className={s.productBlock_imageBlock}>

                                                    <div className={s.productImage}>
                                                        {
                                                            <div className={s.productImage_mainImage}>

                                                                {/*props.images.length === 0 ?*/}
                                                                {/*      <div className={s.item_noImage}>*/}
                                                                {/*          <div className={s.item_noImage_title}>*/}
                                                                {/*             Sorry, no photo!*/}
                                                                {/*          </div>*/}
                                                                {/*         <div className={s.item_noImage_icon}>*/}
                                                                {/*             <img src={NoProductImage} alt="no-product-image"/>*/}
                                                                {/*         </div>*/}
                                                                {/*     </div> :*/}

                                                                <img
                                                                    src={props.images?.filter((n) => n.productId == bindedProduct.id)[0]?.url}
                                                                    alt="product-image"
                                                                />
                                                            </div>
                                                        }

                                                        {
                                                            index > 0 ?
                                                                <div className={s.addBindedImage_box}>
                                                                    {/*<img src={RemoveIcon} alt="remove-icon"*/}
                                                                    {/*     className={s.addBindedImage_deleteItem}*/}
                                                                    {/*     onClick={() => {deleteBindedPhotoHandler(bindedProduct)}}*/}
                                                                    {/*/>*/}

                                                                    <Button buttonDivWrapper={s.deleteBindedPhoto}
                                                                            onClick={() => {
                                                                                deleteBindedPhotoHandler(bindedProduct)
                                                                            }}
                                                                    >
                                                                        Удалить фото
                                                                    </Button>

                                                                    <div className={s.addBindedImage}>
                                                                        <input type="file" id="bindFile"
                                                                               accept="image/png, image/jpeg"
                                                                               className={s.inputFile}
                                                                               onChange={(e) => {
                                                                                   uploadBindedPhotoHandler(e, bindedProduct)
                                                                               }}
                                                                               style={{display: 'none'}}
                                                                        />
                                                                        <label htmlFor="bindFile"
                                                                               className={s.inputButton}>
                                                                            Выбрать файл
                                                                        </label>
                                                                    </div>
                                                                </div> : ''
                                                        }
                                                    </div>
                                                </div>

                                                <div className={s.contentBlock_content}>
                                                    <div className={s.content_options}>
                                                        <fieldset className={s.options_wrapperBox}>
                                                            <legend>Опции</legend>

                                                            <Controller
                                                                name={'productOptions'}
                                                                control={props.control.control}
                                                                render={({field}: any) =>
                                                                    <>
                                                                        <div className={s.options_selectRow}>

                                                                            <div className={s.options_select}>
                                                                                <CreateOptionVariantModal
                                                                                    open={openCreateOption}
                                                                                    setOpen={setOpenCreateOption}
                                                                                    name={selectInput}
                                                                                    onConfirm={(name) => {
                                                                                        createOption(selectInput, name, (opt) => {
                                                                                            addVariantHandler(props.control, bindedProduct, opt)
                                                                                        })
                                                                                    }}/>


                                                                                <Select
                                                                                    className={s.options_search}
                                                                                    options={availableOptions(props.control, bindedProduct)}
                                                                                    placeholder={'Опции'}
                                                                                    isSearchable={true}
                                                                                    value={null}
                                                                                    onInputChange={(v) => {
                                                                                        if (v != '') setSelectInput(v)
                                                                                    }}
                                                                                    onChange={(value) => {
                                                                                        addVariantHandler(props.control, bindedProduct, value as ProductOptionsWithVariants)
                                                                                    }}
                                                                                    getOptionLabel={label => label!.name}
                                                                                    getOptionValue={value => value!.name}
                                                                                    noOptionsMessage={() => 'Опция не найдена'}
                                                                                />
                                                                            </div>
                                                                            <Button
                                                                                buttonDivWrapper={s.options_addButton}
                                                                                onClick={() => {
                                                                                    setOpenCreateOption(true)
                                                                                }}

                                                                                disabled={selectInput === `` || selectInput === ` `}
                                                                            >
                                                                                Створити
                                                                            </Button>
                                                                        </div>

                                                                        <div className={s.options_scrollContainer}>
                                                                            <div className={s.options_list}>

                                                                                {
                                                                                    props.control.getValues('productOptions')?.filter((n: ProductOptionVariantBind) => n.productId === bindedProduct.id)
                                                                                        .map((variant: ProductOptionVariantBind, index: number) => {
                                                                                            let options = (allOptions.filter(n => n.id == variant.optionId)[0]?.optionVariants
                                                                                                .filter(n => !Enumerable.from(field.value as ProductOptionVariantBind[])
                                                                                                    .select(m => m.optionVariantId)
                                                                                                    .contains(n.id)) as ProductOptionVariantBind[])
                                                                                            return (
                                                                                                <div
                                                                                                    className={s.options_listItem}
                                                                                                >
                                                                                                    <div
                                                                                                        className={s.listItem_title}>
                                                                                                        {variant.optionName}
                                                                                                    </div>

                                                                                                    <div
                                                                                                        className={s.listItem_selectWithButton}>


                                                                                                        <Select
                                                                                                            className={s.options_search}
                                                                                                            // classNamePrefix={'react-select'}
                                                                                                            placeholder={'Варианты'}
                                                                                                            options={options}
                                                                                                            onChange={(newValue) => {
                                                                                                                onChangeOptionsVariants(field, bindedProduct, newValue)
                                                                                                                //setEnBut(enBut.filter(n => n.id != variant.id))
                                                                                                            }}
                                                                                                            onInputChange={(v) => {
                                                                                                                if (v != "" && v != " ") {
                                                                                                                    setEnBut({
                                                                                                                        id: variant.optionId,
                                                                                                                        name: v
                                                                                                                    })
                                                                                                                } else {
                                                                                                                    setTimeout(() => {
                                                                                                                        setEnBut(null)
                                                                                                                    }, 100)
                                                                                                                }
                                                                                                            }}
                                                                                                            isSearchable={true}
                                                                                                            defaultValue={variant}
                                                                                                            getOptionLabel={label => label!.name}
                                                                                                            getOptionValue={value => value!.name}
                                                                                                            noOptionsMessage={() => 'Доступных вариантов нету'}
                                                                                                        />
                                                                                                        <Button
                                                                                                            className={s.add_variant_button}
                                                                                                            onClick={() => {
                                                                                                                addOptionVariant(variant, enBut!.name, (value) => {
                                                                                                                    let data = (props.control.getValues('productOptions') as ProductOptionVariantBind[]).filter(n => n.optionId != variant.optionId)
                                                                                                                    props.control.setValue('productOptions', data);
                                                                                                                    addVariantHandler(props.control, bindedProduct, value, enBut!.name)
                                                                                                                })
                                                                                                            }}
                                                                                                            disabled={enBut === null || enBut.id != variant.optionId}>+</Button>
                                                                                                        <Button
                                                                                                            onClick={() => {
                                                                                                                field.onChange(field.value.filter((n: ProductOptionVariantBind) =>
                                                                                                                    n.optionId != variant.optionId || n.productId != bindedProduct.id))
                                                                                                            }}
                                                                                                        >
                                                                                                            Удалить
                                                                                                        </Button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }
                                                            />
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                }
            />
        )
    }
}