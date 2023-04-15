import React, {useState} from 'react'
import s from "./EditProductCardOptionBind.module.scss"
import {
    Product,
    ProductFullData,
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

interface ProductCardOptionBindProps {
    product: ProductFullData
    control: UseFormReturn<any>
}

export const EditProductCardOptionBind = (props: ProductCardOptionBindProps) => {

    const [selectedOption, setSelectedOption] = useState<any>(null)
    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const allOptions = useEditProductCardModal(s => s.allOptions)

    const addVariantHandler = (control: any, product: Product) => {
        let value = control.getValues('productOptions')
        let enumr = Enumerable.from(value as ProductOptionVariantBind[]).select(n => n.id).toArray()
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

    return (
        <Controller
            name={"bindedProducts"}
            control={props.control.control}
            render={({field}: any) =>


                <div className={s.editProductCardOptionBind}>

                    <Button buttonDivWrapper={s.addButton}
                            onClick={() => {
                            }}
                    >
                        Добавить бинд товара
                    </Button>
                    {
                        field.value?.map((bindedProduct: Product) => {
                            return (
                                <>
                                    <div className={s.optionBind_productBlock}>
                                        <div className={s.productBlock_control}>
                                            <div className={s.contentBlock_deleteImg}>
                                                <img src={RemoveIcon} alt="remove-icon" onClick={() => {
                                                }}/>
                                            </div>
                                            <div className={s.productImage}>
                                                <img src={props.product.productImages[0]?.url} alt="product-image"/>
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
                                                                name={'productOptions'}
                                                                control={props.control.control}
                                                                render={({field}: any) =>
                                                                    <>
                                                                        {
                                                                            props.control.getValues('productOptions')?.filter((n: ProductOptionVariantBind) => n.productId === bindedProduct.id).map((variant: ProductOptionVariantBind) => {
                                                                                return (
                                                                                    <div>
                                                                                        {variant.optionName}
                                                                                        <Button onClick={() => {
                                                                                            field.onChange(field.value.filter((n: ProductOptionVariantBind) => n.optionId != variant.optionId || n.productId != bindedProduct.id))
                                                                                        }}>удалить</Button>
                                                                                        <Select
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
                                                            <legend>Индивидуальные теги</legend>
                                                            <Button buttonDivWrapper={s.tags_addButton}
                                                                    onClick={() => {
                                                                    }}
                                                            >
                                                                Х
                                                            </Button>
                                                            <div className={s.tags_list}>
                                                                <div className={s.tags_listItem}>
                                                                    Тег1
                                                                </div>
                                                                <div className={s.tags_listItem}>
                                                                    Тег2
                                                                </div>
                                                                <div className={s.tags_listItem}>
                                                                    Тег3
                                                                </div>
                                                            </div>
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