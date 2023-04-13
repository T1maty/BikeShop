import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import {Button} from "../../../shared/ui"
import Select from "react-select"
import useEditProductCardModal from "./EditProductCardModalStore"
import {Controller, UseFormReturn} from "react-hook-form"
import {ProductOption, ProductOptionVariant, ProductOptionVariantBind} from "../../../entities"
import {ProductOptionsWithVariants} from "./models/ProductOptionsWithVariants"
import Enumerable from "linq";

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

    // текущие значения селектов
    // опция
    const [selectedOption, setSelectedOption] = useState<any>(null)
    // разновидность опции
    const [selectedOptionVariant, setSelectedOptionVariant] = useState<SelectedOptionVariantType[]>([])

    // доступные опции и варианты
    const availableOptions = (field: any) => {
        let optionIds: number[] = []
        field.value.forEach((n: ProductOption) => {
            optionIds.push(n.id)
        })
        return allOptions.filter((n: ProductOption) => !optionIds.includes(n.id))
    }

    // функции для опций
    const addOptionListHandler = (field: any) => {
        field.onChange([...field.value, {...selectedOption, optionVariants: []}])
        setSelectedOption(null)
    }

    const deleteOptionListHandler = (field: any, option: ProductOption) => {
        field.onChange(field.value.filter((n: ProductOption) => n.id != option.id))
        setSelectedOptionVariant([{id: 0, value: {} as ProductOptionVariant}])
    }

    // функции для разновидностей опций
    const onChangeOptionsVariantHandler = (value: any, option: ProductOption) => {
        if (value != undefined) {
            let buf = selectedOptionVariant.filter(n => n.id != option.id)
            buf.push({id: option.id, value: value.value})
            setSelectedOptionVariant(buf)
        }
    }

    const setOptionsVariantHandler = (field: any, option: ProductOptionsWithVariants,
                                      variant: ProductOptionVariant) => {
        let options = field.value.map((n: ProductOptionsWithVariants) => n.id === option.id ?
            {
                ...n,
                optionVariants: n.optionVariants.filter(n => n.id != variant.id),
            } : n)

        field.onChange(options)
        setSelectedOptionVariant([])
    }

    const addOptionVariantHandler = (field: any, option: ProductOptionsWithVariants) => {
        let options = field.value.map((n: ProductOptionsWithVariants) => n.id === option.id ?
            {
                ...n, optionVariants: n.optionVariants != undefined
                    ? [...n.optionVariants, selectedOptionVariant.find(n => n.id === option.id)?.value]
                    : [selectedOptionVariant.find(n => n.id === option.id)?.value]
            } : n)
        field.onChange(options)
        setSelectedOptionVariant([])
    }

    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}: any) =>

                    // <div className={s.rightSide_productOptions}>
                    <>
                        <div className={s.productOptions_optionsList}>
                            {
                                field.value.length === 0 ? <div style={{
                                        width: '350px', textAlign: 'center', wordBreak: 'break-word'
                                    }}>
                                        Для добавления выберите опции
                                    </div> :

                                    field.value.map((optionVariant: ProductOptionVariantBind, index: number) => {
                                        return (
                                            <div className={s.optionsList_item}
                                                 key={optionVariant.id}
                                            >
                                                <fieldset className={s.options_box}>
                                                    <legend>{optionVariant.optionName}</legend>
                                                    <Select
                                                        className={s.options_search}
                                                        options={allOptions.filter(n => n.id == optionVariant.optionId && !(Enumerable.from(currentProduct.productOptions).select(n1 => n1.id).contains(n.id)))[0]?.optionVariants as ProductOptionVariantBind[]}
                                                        placeholder="Разновидность опции"
                                                        isSearchable={true}
                                                        value={optionVariant}
                                                        onChange={(value) => {
                                                            let newOptions = field.value
                                                            newOptions[index] = value as ProductOptionVariantBind
                                                            field.onChange(newOptions)
                                                        }}
                                                        getOptionLabel={label => label!.name}
                                                        getOptionValue={value => value!.name}
                                                        noOptionsMessage={() => 'Доступных вариантов нету'}
                                                    />
                                                </fieldset>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        <div className={s.productOptions_selectRow}>
                            <Button buttonDivWrapper={s.options_button}
                                    onClick={() => {
                                        addOptionListHandler(field)
                                    }}
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
                                onChange={(value: any) => {
                                    setSelectedOption(value)
                                }}
                                getOptionLabel={label => label!.name}
                                getOptionValue={value => value!.name}
                                noOptionsMessage={() => 'Опция не найдена'}
                            />
                        </div>
                    </>
                    // </div>
                }
            />
        </div>
    )
}