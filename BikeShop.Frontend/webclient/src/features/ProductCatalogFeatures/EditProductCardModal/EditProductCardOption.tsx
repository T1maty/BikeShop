import React, {useState} from 'react';
import s from "./EditProductCardModal.module.scss";
import {ProductCardOption, ProductCardOptionVariant} from "../../../entities/models/ProductCardModels";
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg";
import {Button} from "../../../shared/ui";
import Select from "react-select";
import useEditProductCardModal from "./EditProductCardModalStore";

const EditProductCardOption = () => {
    const cardOptions = useEditProductCardModal(s => s.cardOptions)
    const currentCardOptions = useEditProductCardModal(s => s.currentCardOptions)
    const setCurrentCardOptions = useEditProductCardModal(s => s.setCurrentCardOptions)
    const addCurrentCardOption = useEditProductCardModal(s => s.addCurrentCardOption)
    const currentOptionVariants = useEditProductCardModal(s => s.currentOptionVariants)
    const setCurrentOptionsVariants = useEditProductCardModal(s => s.setCurrentOptionsVariants)
    const addCurrentOptionVariant = useEditProductCardModal(s => s.addCurrentOptionVariant)

    // текущие значения селектов
    const [selectedOption, setSelectedOption] = useState<any>(null) // опция
    const [selectedOptionVariant, setSelectedOptionVariant] = useState<any>(null) // разновидность опции

    // функции для опций
    const addOptionListHandler = () => {
        const newOption = cardOptions.find(el => el.option.id === selectedOption.option.id)

        // проверка на повторяемость опций
        if (currentCardOptions.length < cardOptions.length) {
            addCurrentCardOption(newOption!)
            setSelectedOption(null)
        } else {
            console.log('Превышено количество опций')
        }
    }
    // console.log('текущие опции', currentCardOptions)

    const deleteOptionListHandler = (optionsItem: ProductCardOption) => {
        setCurrentCardOptions(currentCardOptions.filter(el => el.option.id !== optionsItem.option.id))
    }

    // функции для разновидности опций
    const addOptionVariantHandler = (optionListId: number) => {
        // проверка на повторяемость опций
        // надо поставить динамическое значение длины
        if (currentOptionVariants.length < 2) {
            // исправить
            addCurrentOptionVariant(selectedOptionVariant)

            // const newOptionVariant = currentCardOptions.find(el => el.optionVariants
            //     .find(ov => ov.id === selectedOptionVariant.id))

            // currentCardOptions.map(el => el.option.id === selectedSpecification.optionId ?
            //     .find(ov => ov.id === selectedOptionVariant.id))

            setSelectedOptionVariant(null)
        } else {
            console.log('Превышено количество опций')
        }
    }
    // console.log('выбранная опция - variant', selectedOptionVariant)
    // console.log('текущие variant', currentOptionVariants)

    const deleteOptionVariantHandler = (optionId: number, variantId: number) => {
        // исправить
        setCurrentOptionsVariants(currentOptionVariants.filter(el => el.id !== variantId))

        // setCurrentCardOptions(currentCardOptions.map(el => el.option.id === optionId ?
        //     { ...el, optionVariants: el.optionVariants.filter(variant => variant.id !== variantId) } : el))
    }


    return (
        <div className={s.rightSide_productOptions}>
            <div className={s.productOptions_optionsList}>
                {
                    currentCardOptions.length === 0 ? <div style={{textAlign: 'center'}}>
                            Для добавления выберите опции
                        </div> :

                        currentCardOptions.map((currentOption: ProductCardOption) => {
                            return (
                                <div className={s.optionsList_item}
                                     key={currentOption.option.id}
                                >
                                    <fieldset className={s.options_box}>
                                        <legend>{currentOption.option.name}</legend>
                                        <div className={s.options_rowItems}>
                                            <div className={s.rowItems_item}>
                                                <div className={s.item_deleteFullItem}
                                                     onClick={() => {
                                                         deleteOptionListHandler(currentOption)
                                                     }}
                                                >
                                                    Удалить опцию
                                                </div>
                                                {
                                                    currentOptionVariants.map((variant: ProductCardOptionVariant) => {
                                                        return (
                                                            <div className={s.item_content}
                                                                 style={{marginBottom: '5px'}}
                                                                 key={variant.id}
                                                            >
                                                                <div className={s.item_title}>
                                                                    {variant.name}
                                                                </div>
                                                                <img src={RemoveIcon} alt="remove-icon"
                                                                     onClick={() => {
                                                                         deleteOptionVariantHandler(currentOption.option.id, variant.id)
                                                                     }}
                                                                />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className={s.rowItems_chooseItem}>
                                                <Button buttonDivWrapper={s.options_button}
                                                        onClick={() => {
                                                            addOptionVariantHandler(currentOption.option.id)
                                                        }}
                                                        disabled={selectedOptionVariant === null}
                                                >
                                                    +
                                                </Button>
                                                <Select
                                                    className={s.options_search}
                                                    options={currentOption.optionVariants}
                                                    placeholder="Разновидность опции"
                                                    isSearchable={true}
                                                    value={selectedOptionVariant}
                                                    onChange={(value: any) => {
                                                        setSelectedOptionVariant(value)
                                                    }}
                                                    getOptionLabel={label => label!.name}
                                                    getOptionValue={value => value!.name}
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
                        onClick={addOptionListHandler}
                        disabled={selectedOption === null ||
                            currentCardOptions.length === cardOptions.length}
                >
                    +
                </Button>

                {/*<ControlledSelect control={formControl}*/}
                {/*                  name={'option'}*/}
                {/*                  label={'Опции'}*/}
                {/*                  className={s.options_search}*/}
                {/*                  data={options.map((el) => {*/}
                {/*                      return {id: el.id, value: el.name ? el.name : 'Нет опции'}*/}
                {/*                  })}*/}
                {/*/>*/}

                <Select
                    className={s.options_search}
                    options={cardOptions}
                    placeholder="Опции"
                    isSearchable={true}
                    value={selectedOption}
                    onChange={(value: any) => {
                        setSelectedOption(value)
                    }}
                    getOptionLabel={label => label!.option.name}
                    getOptionValue={value => value!.option.name}
                    noOptionsMessage={() => 'Опция не найдена'}
                />
            </div>
        </div>
    );
};

export default EditProductCardOption;