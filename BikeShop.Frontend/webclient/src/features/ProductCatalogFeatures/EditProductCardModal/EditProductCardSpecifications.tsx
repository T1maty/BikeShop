import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import {Button, EditableSpan} from "../../../shared/ui"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import Select from "react-select"
import useEditProductCardModal from "./EditProductCardModalStore"
import {Controller, UseFormReturn} from "react-hook-form"
import {ProductSpecificationBind} from "../../../entities"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
    divClassName?: any
    disabled?: boolean
}

export const EditProductCardSpecifications = (props: ControlledProps) => {

    // характеристика (spec)
    const allSpecifications = useEditProductCardModal(s => s.allSpecifications)
    const [selectedSpecification, setSelectedSpecification] = useState<ProductSpecificationBind>()

    const getSpecificationsHandler = (field: any) => {
        let ids: number[] = []
        field.value.forEach((n: ProductSpecificationBind) => {
            ids.push(n.id)
        })

        let availableSpecs: ProductSpecificationBind[] = []
        allSpecifications.filter(n => !ids.includes(n.id)).forEach(n => {
            let s: ProductSpecificationBind = {
                id: 0,
                name: n.name,
                productId: 0,
                sortOrder: 0,
                description: 'Вводить сюда',
                specificationId: n.id,
                createdAt: n.createdAt,
                updatedAt: n.updatedAt,
                enabled: n.enabled,
            }
            availableSpecs.push(s)
        })
        return availableSpecs
    }

    const onChangeSpecificationHandler = (newInputValue: string, field: any, spec: ProductSpecificationBind) => {
        field.onChange(field.value.map((n: ProductSpecificationBind) => n.id === spec.id ? {
            ...n,
            description: newInputValue
        } : n))
    }

    const editSpecificationHandler = (field: any) => {
        field.onChange([...field.value, {
            ...selectedSpecification,
            description: 'Введите описание характеристики'
        }])
        setSelectedSpecification(undefined)
    }

    const deleteSpecificationHandler = (field: any, spec: ProductSpecificationBind) => {
        field.onChange(field.value.filter((n: ProductSpecificationBind) => n.id != spec.id))
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
                                    <div style={{width: '350px', textAlign: 'center', wordBreak: 'break-word'}}>
                                        Для добавления выберите характеристику
                                    </div> :

                                    field.value.map((spec: ProductSpecificationBind, index: number) => {
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
                                                                         onClick={() => {
                                                                             deleteSpecificationHandler(field, spec)
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

                        <div className={s.productOptions_selectRow}>
                            <Button buttonDivWrapper={s.options_button}
                                    onClick={() => {
                                        editSpecificationHandler(field)
                                    }}
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
                                onChange={(value) => {
                                    setSelectedSpecification(value as ProductSpecificationBind)
                                }}
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