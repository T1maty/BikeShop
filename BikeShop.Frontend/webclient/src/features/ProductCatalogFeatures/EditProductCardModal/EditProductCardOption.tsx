import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import {Button} from "../../../shared/ui"
import Select from "react-select"
import useEditProductCardModal from "./EditProductCardModalStore"
import {Controller, UseFormReturn} from "react-hook-form"
import {ProductOption, ProductOptionVariant, ProductOptionVariantBind} from "../../../entities"
import Enumerable from "linq"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg";

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
    divClassName?: any
    disabled?: boolean
}

type SelectedOptionVariantType = {
    id: number
    value: ProductOptionVariant
}

export const EditProductCardOption = (props: ControlledProps) => {

    const allOptions = useEditProductCardModal(s => s.allOptions)
    const currentProduct = useEditProductCardModal(s => s.currentProduct)

    // текущие значения селектов // опция
    const [selectedOption, setSelectedOption] = useState<any>(null)

    // доступные опции и варианты
    const availableOptions = (field: any) => {
        let enumr = Enumerable.from(field.value as ProductOptionVariantBind[])
        let options = allOptions.filter((n: ProductOption) => !(enumr.where(m => m.productId == currentProduct.product.id).select(m => m.optionId).contains(n.id)))
        return options.filter(n => enumr.where(m => m.optionId == n.id).toArray().length < n.optionVariants.length)

    }

    // функции для опций
    const addOptionListHandler = (field: any) => {
        let enumr = Enumerable.from(field.value as ProductOptionVariantBind[]).select(n => n.id).toArray()
        let r = selectedOption.optionVariants.filter((n: ProductOptionVariant) => !enumr.includes(n.id))[0]

        let variant: ProductOptionVariantBind
        variant = {
            productId: currentProduct.product.id,
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

        field.onChange([...field.value, variant])
        setSelectedOption(null)
    }

    const deleteOptionHandler = (field: any, optionId: number, productId: number) => {
        field.onChange(field.value.filter((n: ProductOptionVariantBind) => n.optionId != optionId || n.productId != productId))
    }

    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}: any) =>

                    <>
                        <div className={s.productOptions_optionsList}>
                            {
                                field.value.length === 0 ? <div style={{width: '350px',
                                        textAlign: 'center', wordBreak: 'break-word', color: 'white'
                                    }}>
                                        Для добавления выберите опции
                                    </div> :

                                    field.value
                                        .filter((n: ProductOptionVariantBind) => n.productId === currentProduct.product.id)
                                        .map((optionVariant: ProductOptionVariantBind, index: number) => {
                                        return (
                                            <div className={s.optionsList_item}
                                                 key={index}
                                            >
                                                <fieldset className={s.options_box}>
                                                    <legend style={{color: 'white'}}>
                                                        {optionVariant.optionName}
                                                    </legend>
                                                    <Select
                                                        className={s.options_search}
                                                        options={allOptions.filter(n => n.id == optionVariant.optionId && !(Enumerable
                                                            .from(field.value as ProductOptionVariantBind[])
                                                            .select(n1 => n1.id)
                                                            .contains(n.id)))[0]?.optionVariants as ProductOptionVariantBind[]}
                                                        placeholder="Разновидность опции"
                                                        isSearchable={true}
                                                        value={optionVariant}
                                                        onChange={(value) => {
                                                            let r = value as ProductOptionVariant
                                                            let base = field.value as ProductOptionVariantBind[]

                                                            let variant: ProductOptionVariantBind
                                                            variant = {
                                                                productId: currentProduct.product.id,
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

                                                            let target = base.filter((n: ProductOptionVariantBind) => n.productId === currentProduct.product.id)
                                                                .filter((n: ProductOptionVariantBind) => n.optionId === value?.optionId)[0]
                                                            let ind = base.indexOf(target)
                                                            base[ind] = variant
                                                            console.log(variant)
                                                            field.onChange(base)
                                                        }}
                                                        getOptionLabel={label => label!.name}
                                                        getOptionValue={value => value!.name}
                                                        noOptionsMessage={() => 'Доступных вариантов нету'}
                                                    />
                                                </fieldset>
                                                <div className={s.item_deleteDetailsItem}>
                                                    <img src={RemoveIcon} alt="remove-icon"
                                                         onClick={() => {
                                                             deleteOptionHandler(field, optionVariant.optionId, currentProduct.product.id)}}
                                                    />
                                                </div>
                                                {/*<Button onClick={() => {*/}
                                                {/*    deleteOptionHandler(field, optionVariant.optionId, currentProduct.product.id)}}*/}
                                                {/*>*/}
                                                {/*    Х*/}
                                                {/*</Button>*/}
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        <div className={s.productOptions_selectRow}>
                            <Button buttonDivWrapper={s.options_button}
                                    onClick={() => {addOptionListHandler(field)}}
                                    disabled={selectedOption === null}
                            >
                                +
                            </Button>
                            <Select
                                className={s.options_search}
                                options={availableOptions(field)}
                                placeholder="Опции"
                                isSearchable={true}
                                value={selectedOption}
                                onChange={(value: any) => {setSelectedOption(value)}}
                                getOptionLabel={label => label!.name}
                                getOptionValue={value => value!.name}
                                noOptionsMessage={() => 'Опция не найдена'}
                            />
                        </div>
                    </>
                }
            />
        </div>
    )
}