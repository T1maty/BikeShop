import React, {useState} from 'react';
import s from "./EditProductCardModal.module.scss";
import {ProductCardUserSpecification} from "../../../entities/models/ProductCardModels";
import {Button, EditableSpan} from "../../../shared/ui";
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg";
import Select from "react-select";
import useEditProductCardModal from "./EditProductCardModalStore";

const EditProductCardSpecifications = () => {

    const specifications = useEditProductCardModal(s => s.specifications)
    const currentSpecifications = useEditProductCardModal(s => s.currentSpecifications)
    const setCurrentSpecifications = useEditProductCardModal(s => s.setCurrentSpecifications)
    const addCurrentSpecification = useEditProductCardModal(s => s.addCurrentSpecification)

    const [selectedSpecification, setSelectedSpecification] = useState<any>(null) // характеристика (spec)

    // функции для характеристик
    const addSpecificationHandler = () => {
        const newSpecification: ProductCardUserSpecification =
            {id: Date.now(), name: selectedSpecification.name, title: 'Введите текст'}
        addCurrentSpecification(newSpecification)
        setSelectedSpecification(null)
    }

    const deleteSpecificationHandler = (specItem: ProductCardUserSpecification) => {
        setCurrentSpecifications(currentSpecifications.filter(el => el.id !== specItem.id))
    }

    const changeSpecificationTitleHandler = (specId: number, newInputValue: string) => {
        setCurrentSpecifications(currentSpecifications.map(spec => spec.id === specId ?
            {...spec, title: newInputValue} : spec))
    }

    return (
        <div className={s.rightSide_productDetails}>
            <div className={s.productOptions_optionsList}>
                {
                    currentSpecifications.length === 0 ?
                        <div style={{textAlign: 'center'}}>
                            Для добавления выберите характеристики
                        </div> :

                        currentSpecifications.map((spec: ProductCardUserSpecification) => {

                            const onChangeTitleHandler = (newInputValue: string) => {
                                changeSpecificationTitleHandler(spec.id, newInputValue)
                            }

                            return (
                                <div className={s.optionsList_item}
                                     key={spec.id}
                                >
                                    <fieldset className={s.options_box}>
                                        <legend>{spec.name}</legend>
                                        <div className={s.options_rowItems}>
                                            <div className={s.rowItems_item}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <div className={s.item_content}>
                                                        <EditableSpan title={spec.title}
                                                                      onChangeInput={onChangeTitleHandler}
                                                        />
                                                    </div>
                                                    <div className={s.item_deleteDetailsItem}>
                                                        <img src={RemoveIcon} alt="remove-icon"
                                                             onClick={() => {
                                                                 deleteSpecificationHandler(spec)
                                                             }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            )
                        })
                }
            </div>
            {/*<form onSubmit={formControl.handleSubmit(onSubmit)}>*/}
            <div className={s.productOptions_selectRow}>
                <Button buttonDivWrapper={s.options_button}
                        onClick={addSpecificationHandler}
                        disabled={selectedSpecification === null}
                >
                    +
                </Button>
                <Select
                    className={s.options_search}
                    options={specifications}
                    placeholder={'Характеристика'}
                    isSearchable={true}
                    value={selectedSpecification}
                    onChange={(value: any) => {
                        setSelectedSpecification(value)
                    }}
                    getOptionLabel={label => label!.name}
                    getOptionValue={value => value!.name}
                    noOptionsMessage={() => 'Характеристика не найдена'}
                />
                {/*<AsyncSelect*/}
                {/*    className={s.options_search}*/}
                {/*    loadOptions={getSpecifications}*/}
                {/*    placeholder={'Характеристика'}*/}
                {/*    isSearchable={true}*/}
                {/*    value={selectedSpecification}*/}
                {/*    onChange={(value: any) => {setSelectedSpecification(value)}}*/}
                {/*    getOptionLabel={label => label!.name}*/}
                {/*    getOptionValue={value => value!.name}*/}
                {/*/>*/}
            </div>
            {/*</form>*/}
        </div>
    );
};

export default EditProductCardSpecifications;