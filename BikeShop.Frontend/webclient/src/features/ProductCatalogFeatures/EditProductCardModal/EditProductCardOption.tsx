import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import {Button} from "../../../shared/ui"
import Select from "react-select"
import useEditProductCardModal from "./EditProductCardModalStore"
import {Controller, UseFormReturn} from "react-hook-form"
import {ProductOption, ProductOptionVariant} from "../../../entities"

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

    const cardOptions = useEditProductCardModal(s => s.cardOptions)
    const currentCardOptions = useEditProductCardModal(s => s.currentCardOptions)

    // текущие значения селектов
    const [selectedOption, setSelectedOption] = useState<any>(null) // опция
    const [selectedOptionVariant, setSelectedOptionVariant] = useState<SelectedOptionVariantType[]>([]) // разновидность опции

    // доступные опции и варианты
    const availableOptions = (field: any) => {
        let optionIds: number[] = []
        field.value.forEach((n: ProductOption) => {optionIds.push(n.id)})
        return cardOptions.filter((n: ProductOption) => !optionIds.includes(n.id))
    }

    const availableVariants = (option: ProductOption) => {
        let optionItem = cardOptions.filter(n => n.id === option.id)[0]
        let ids: number[] = []
        option.optionVariants.map(n => ids.push(n.id))
        let buf = optionItem.optionVariants.filter(n => !ids.includes(n.id))
        let result: { id: number, value: any }[] = []
        buf.forEach(n => {result.push({ id: option.id, value: n })})
        return result
    }

    // функции для опций
    const addOptionListHandler = (field: any) => {
        field.onChange([...field.value, {...selectedOption, optionVariants: []}])
        setSelectedOption(null)
    }

    const deleteOptionListHandler = (field: any, option: ProductOption) => {
        field.onChange(field.value.filter((n: ProductOption) => n.id != option.id))
        setSelectedOptionVariant([{ id: 0, value: {} as ProductOptionVariant }])
    }

    // функции для разновидностей опций
    const onChangeOptionsVariantHandler = (value: any, option: ProductOption) => {
        if (value != undefined) {
            let buf = selectedOptionVariant.filter(n => n.id != option.id)
            buf.push({ id: option.id, value: value.value })
            setSelectedOptionVariant(buf)
        }
    }

    const setOptionsVariantHandler = (field: any, option: ProductOption, variant: ProductOptionVariant) => {
        let options = field.value.map((n: ProductOption) => n.id === option.id ?
            {...n, optionVariants: n.optionVariants.filter(n => n.id != variant.id)} : n)
        field.onChange(options)
        setSelectedOptionVariant([])
    }

    const addOptionVariantHandler = (field: any, option: ProductOption) => {
        let options = field.value.map((n: ProductOption) => n.id === option.id ?
            {...n, optionVariants: n.optionVariants != undefined
                    ? [...n.optionVariants, selectedOptionVariant.find(n => n.id === option.id)?.value]
                    : [selectedOptionVariant.find(n => n.id === option.id)?.value]
            } : n)
        field.onChange(options)
        setSelectedOptionVariant([])
        console.log(selectedOptionVariant)
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

                                    field.value.map((option: ProductOption) => {
                                        availableVariants(option)

                                        return (
                                            <div className={s.optionsList_item}
                                                 key={option.id}
                                            >
                                                <fieldset className={s.options_box}>
                                                    <legend>{option.name}</legend>
                                                    <div className={s.options_rowItems}>
                                                        <div className={s.rowItems_item}>
                                                            <div className={s.item_deleteFullItem}
                                                                 onClick={() => {deleteOptionListHandler(field, option)}}
                                                            >
                                                                Удалить опцию
                                                            </div>
                                                            {
                                                                option.optionVariants?.map((variant: ProductOptionVariant) => {
                                                                    return (
                                                                        <div className={s.item_content}
                                                                             style={{marginBottom: '5px'}}
                                                                             key={variant.id}
                                                                        >
                                                                            <div className={s.item_title}>
                                                                                {variant.name}
                                                                            </div>
                                                                            <img src={RemoveIcon} alt="remove-icon"
                                                                                 onClick={() => {setOptionsVariantHandler(field, option, variant)}}
                                                                            />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div className={s.rowItems_chooseItem}>
                                                            <Button buttonDivWrapper={s.options_button}
                                                                    onClick={() => {addOptionVariantHandler(field, option)}}
                                                                    disabled={selectedOptionVariant.find(n => n.id === option.id) === undefined}
                                                            >
                                                                +
                                                            </Button>
                                                            <Select
                                                                className={s.options_search}
                                                                options={availableVariants(option)}
                                                                placeholder="Разновидность опции"
                                                                isSearchable={true}
                                                                value={selectedOptionVariant.find(n => n.id === option.id)
                                                                    ? selectedOptionVariant.find(n => n.id === option.id) : null}
                                                                onChange={(value) => {onChangeOptionsVariantHandler(value, option)}}
                                                                getOptionLabel={label => label!.value.name}
                                                                getOptionValue={value => value!.value.name}
                                                                noOptionsMessage={() => 'Опция не найдена'}
                                                            />
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        <div className={s.productOptions_selectRow}>
                            <Button buttonDivWrapper={s.options_button}
                                    onClick={() => {addOptionListHandler(field)}}
                                    disabled={selectedOption === null || currentCardOptions.length === cardOptions.length}
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
                    // </div>
                }
            />
        </div>
    )
}