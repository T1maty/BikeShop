import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import {Button, EditableSpan} from "../../../shared/ui"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import Select from "react-select"
import useEditProductCardModal from "./EditProductCardModalStore"
import {Controller, UseFormReturn} from "react-hook-form"
import {ProductSpecification} from "../../../entities"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
    divClassName?: any
    disabled?: boolean
}

export const EditProductCardSpecifications = (props: ControlledProps) => {

    // характеристика (spec)
    const specifications = useEditProductCardModal(s => s.specifications)
    const [selectedSpecification, setSelectedSpecification] = useState<ProductSpecification>()

    const getSpecificationsHandler = (field: any) => {
        let ids: number[] = []
        field.value.forEach((n: ProductSpecification) => {ids.push(n.id)})
        return specifications.filter(n => !ids.includes(n.id))
    }

    const onChangeSpecificationHandler = (newInputValue: string, field: any, spec: ProductSpecification) => {
        field.onChange(field.value.map((n: ProductSpecification) => n.id === spec.id ? {...n, description: newInputValue} :n))
    }

    const editSpecificationHandler = (field: any) => {
        field.onChange([...field.value, {
            ...selectedSpecification,
            description: 'Введите описание характеристики'
        }])
        setSelectedSpecification(undefined)
    }

    const deleteSpecificationHandler = (field: any, spec: ProductSpecification) => {
        field.onChange(field.value.filter((n: ProductSpecification) => n.id != spec.id))
    }

    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}: any) =>

                    /*<div className={s.rightSide_productDetails}>*/
                    <>
                        <div className={s.productOptions_optionsList}>
                            {
                                field.value.length === 0 ?
                                    <div style={{textAlign: 'center'}}>
                                        Для добавления выберите характеристики
                                    </div> :

                                    field.value.map((spec: ProductSpecification, index: number) => {
                                        return (
                                            <div className={s.optionsList_item}
                                                 key={index}
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
                                                                    <EditableSpan title={spec.description}
                                                                                  onChangeInput={(newInputValue) => {
                                                                                      onChangeSpecificationHandler(newInputValue, field, spec)
                                                                                  }}
                                                                    />
                                                                </div>
                                                                <div className={s.item_deleteDetailsItem}>
                                                                    <img src={RemoveIcon} alt="remove-icon"
                                                                         onClick={() => {deleteSpecificationHandler(field, spec)}}
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

                        <div className={s.productOptions_selectRow}>
                            <Button buttonDivWrapper={s.options_button}
                                    onClick={() => {editSpecificationHandler(field)}}
                                    disabled={selectedSpecification === undefined}
                            >
                                +
                            </Button>
                            <Select
                                className={s.options_search}
                                options={getSpecificationsHandler(field)}
                                placeholder={'Характеристика'}
                                isSearchable={true}
                                value={selectedSpecification ? selectedSpecification : null}
                                onChange={(value) => {setSelectedSpecification(value as ProductSpecification)}}
                                getOptionLabel={label => label!.name}
                                getOptionValue={value => value!.name}
                                noOptionsMessage={() => 'Характеристика не найдена'}
                            />
                        </div>
                    </>
                    /*</div>*/
                }
            />
        </div>
    )
}