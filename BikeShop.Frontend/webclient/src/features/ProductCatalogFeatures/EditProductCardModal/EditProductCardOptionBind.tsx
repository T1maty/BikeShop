import React, {useEffect, useState} from 'react'
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
import {AsyncSelectSearchProduct, Button, DeleteButton, LoaderScreen} from '../../../shared/ui'
import Select from 'react-select'
import useEditProductCardModal from './EditProductCardModalStore'
import Enumerable from 'linq'
import {useSnackbar} from 'notistack'
import {ProductOptionsWithVariants} from "./models/ProductOptionsWithVariants";
import CreateOptionVariantModal from "./CreateOptionVariantModal";
import {ChooseProductModal} from "../../../widgets/workspace/ProductCatalog/ChooseProductModal/ChooseProductModal";

interface ProductCardOptionBindProps {
    product: ProductFullData
    images: ProductImage[]
    setImages: (value: ProductImage[]) => void
}

export const EditProductCardOptionBind = (props: ProductCardOptionBindProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const allOptions = useEditProductCardModal(s => s.allOptions)
    const isLoading = useEditProductCardModal(s => s.isLoading)
    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const setIsLoading = useEditProductCardModal(s => s.setIsLoading)
    const createOption = useEditProductCardModal(s => s.createOption)
    const addOptionVariant = useEditProductCardModal(s => s.addOptionVariant)
    const selectedBindedProductId = useEditProductCardModal(s => s.selectedBindedProductId)
    const setSelectedBindedProductId = useEditProductCardModal(s => s.setSelectedBindedProductId)
    const addProductBindd = useEditProductCardModal(s => s.addProductBind)
    const removeProductBind = useEditProductCardModal(s => s.removeProductBind)
    const setOptions = useEditProductCardModal(s => s.setOptions)

    const [v, sV] = useState(false)
    const [selectInput, setSelectInput] = useState('')
    const [openCreateOption, setOpenCreateOption] = useState(false)
    const [enBut, setEnBut] = useState<{ id: number, name: string, bindId: number } | null>(null)

    useEffect(() => {
        !openCreateOption ? setSelectInput('') : null
    }, [openCreateOption])
    const availableOptions = (product: Product) => {
        let enumr = Enumerable.from(currentProduct.productOptions)
        let options = allOptions.filter((n: ProductOption) => !(enumr.where(m => m.productId == product.id)
            .select(m => m.optionId).contains(n.id)))
        return options.filter(n => enumr.where(m => m.optionId == n.id).toArray().length < n.optionVariants.length)
    }
    const addVariantHandler = (product: Product, selectedOption: ProductOptionsWithVariants, justCreatedName?: string) => {
        let value = currentProduct.productOptions
        let r: ProductOptionVariant
        if (justCreatedName != undefined) {
            r = selectedOption.optionVariants.find(n => n.name === justCreatedName)!
        } else {
            r = selectedOption.optionVariants
                .filter((n: ProductOptionVariant) => !Enumerable
                    .from(currentProduct.productOptions)
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

        setOptions([...value, variant])
    }
    const onChangeOptionsVariants = (bindedProduct: Product, r: ProductOptionVariant) => {
        let variant: ProductOptionVariantBind =
            {
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

        setOptions(currentProduct.productOptions.map(n => {
            if (n.productId === bindedProduct.id && n.optionId === r.optionId) return variant
            return n
        }))

    }
    const addProductBind = (product: Product) => {
        if (Enumerable.from(currentProduct.bindedProducts).select(n => n.id).contains(product.id)) {
            enqueueSnackbar('Этот товар уже в бинде', {
                variant: 'warning',
                autoHideDuration: 3000
            })
            return
        }

        ProductCardAPI.getProductCardById(product.id).then((r) => {
            if (r.data.product.id == product.id && r.data.bindedProducts.length === 1) {
                addProductBindd(r.data)
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
    const removeBindedProduct = (product: Product) => {
        removeProductBind(product.id)
    }

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {
        return (
            <div className={s.optionBind}>


                <ChooseProductModal open={v}
                                    setOpen={sV}
                                    addData={(product) => {
                                        addProductBind(product)
                                    }}
                />
                <div className={s.optionBind_header}>
                    <div className={s.search_wrapper}>
                        <AsyncSelectSearchProduct onSelect={(p) => {
                            addProductBind(p)
                        }}/>
                    </div>

                    <Button buttonDivWrapper={s.addBindButton} onClick={() => {
                        sV(true)
                    }}>
                        Добавить бинд товара
                    </Button>
                </div>

                {
                    [...currentProduct.bindedProducts].sort((a, b) => a.isMaster ? 1 : 0).map((bindedProduct: Product, index: number) => {
                        return (
                            <div className={s.optionBind_productBlock} onClick={() => {
                                setSelectedBindedProductId(bindedProduct.id)
                            }}
                            >

                                <div className={s.productBlock_productContent}
                                     style={{border: selectedBindedProductId === bindedProduct.id ? "5px solid black" : ""}}>
                                    <div className={s.productContent_info}
                                         style={{color: index === 0 ? "gold" : ''}}>
                                        <div className={s.pci_name}>
                                            <div className={s.pci_number}>
                                                №{index + 1}
                                            </div>
                                            Арт.: {bindedProduct.id} {'|'} {''}
                                            <div
                                                className={s.pci_name_name}>{bindedProduct.name}</div>
                                            {'|'} {''}
                                            Кат.:{bindedProduct.catalogKey}
                                        </div>


                                        {
                                            index > 0 ?
                                                <div className={s.productBlock_deleteBindProduct}>
                                                    <DeleteButton size={25} onClick={() => {
                                                        removeBindedProduct(bindedProduct)
                                                    }}/>
                                                </div> : ''
                                        }

                                    </div>

                                    <div className={s.productContent_contentBlock}>
                                        <div className={s.contentBlock_content}>
                                            <div className={s.content_options}>
                                                <fieldset className={s.options_wrapperBox}>
                                                    <legend>Опции</legend>
                                                    <>
                                                        <div className={s.options_selectRow}>

                                                            <div className={s.options_select}>
                                                                <CreateOptionVariantModal
                                                                    open={openCreateOption}
                                                                    setOpen={setOpenCreateOption}
                                                                    name={selectInput}
                                                                    onConfirm={(name) => {
                                                                        createOption(selectInput, name, (opt) => {
                                                                            addVariantHandler(bindedProduct, opt)
                                                                        })
                                                                    }}/>


                                                                <Select
                                                                    className={s.options_search}
                                                                    options={availableOptions(bindedProduct)}
                                                                    placeholder={'Опции'}
                                                                    isSearchable={true}
                                                                    value={null}
                                                                    onInputChange={(v) => {
                                                                        if (v != '') setSelectInput(v)
                                                                    }}
                                                                    onChange={(value) => {
                                                                        addVariantHandler(bindedProduct, value as ProductOptionsWithVariants)
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
                                                                    currentProduct.productOptions.filter((n: ProductOptionVariantBind) => n.productId === bindedProduct.id)
                                                                        .map((variant: ProductOptionVariantBind, index: number) => {
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
                                                                                            placeholder={'Варианты'}
                                                                                            options={(allOptions.filter(n => n.id == variant.optionId)[0]?.optionVariants as ProductOptionVariantBind[])}
                                                                                            onChange={(newValue) => {
                                                                                                onChangeOptionsVariants(bindedProduct, newValue as ProductOptionVariantBind)
                                                                                            }}
                                                                                            onInputChange={(v) => {
                                                                                                if (v != "" && v != " ") {
                                                                                                    setEnBut({
                                                                                                        id: variant.optionId,
                                                                                                        name: v,
                                                                                                        bindId: bindedProduct.id
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
                                                                                                    let data = currentProduct.productOptions.filter(n => n.optionId != variant.optionId)
                                                                                                    setOptions(data);
                                                                                                    addVariantHandler(bindedProduct, value, enBut!.name)
                                                                                                })
                                                                                            }}
                                                                                            disabled={enBut === null || enBut.id != variant.optionId || enBut.bindId != bindedProduct.id}>+</Button>
                                                                                        <Button
                                                                                            onClick={() => {
                                                                                                setOptions(currentProduct.productOptions.filter((n) =>
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
        )
    }
}