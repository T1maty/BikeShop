import React, {useState} from 'react'
import s from './EditProductCardSpecifications.module.scss'
import {Button, DeleteButton, EditableSpan} from '../../../shared/ui'
import Select from 'react-select'
import useEditProductCardModal from './EditProductCardModalStore'
import {Controller, UseFormReturn} from 'react-hook-form'
import {ProductSpecificationBind} from '../../../entities'

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
    divClassName?: any
    disabled?: boolean
}

export const EditProductCardSpecifications = (props: ControlledProps) => {

    const allSpecifications = useEditProductCardModal(s => s.allSpecifications)

    const [selectedSpecification, setSelectedSpecification] = useState<ProductSpecificationBind>()

    const getSpecificationsHandler = (field: any) => {
        let ids: number[] = []
        field.value.forEach((n: ProductSpecificationBind) => {
            ids.push(n.specificationId)
        })

        let availableSpecs: ProductSpecificationBind[] = []

        allSpecifications.filter(n => !ids.includes(n.id)).forEach(n => {
            let s: ProductSpecificationBind = {
                id: 0,
                name: n.name,
                productId: 0,
                sortOrder: 0,
                description: 'Введите текст',
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
        field.onChange(field.value.map((n: ProductSpecificationBind) => n.specificationId === spec.specificationId ?
            {...n, description: newInputValue} : n))
    }

    const editSpecificationHandler = (field: any) => {
        field.onChange([...field.value, selectedSpecification])
        setSelectedSpecification(undefined)
    }

    const deleteSpecificationHandler = (field: any, spec: ProductSpecificationBind) => {
        field.onChange(field.value.filter((n: ProductSpecificationBind) => n.specificationId !== spec.specificationId))
    }

    return (
        <Controller
            name={props.name}
            control={props.control.control}
            render={({field}: any) =>

                <div className={s.productSpecifications}>
                    <div className={s.specificationsList}>
                        {
                            field.value.length === 0 ?
                                <div className={s.emptyList}>
                                    Для добавления выберите характеристику
                                </div> :

                                field.value.map((spec: ProductSpecificationBind, index: number) => {
                                    return (
                                        <div className={s.specificationsList_item}
                                             key={index}
                                        >
                                            <fieldset className={s.specification_box}>
                                                <legend style={{color: 'white'}}>{spec.name}</legend>

                                                <div className={s.specifications_rowItems}>
                                                    <div className={s.rowItems_item}>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <div className={s.item_content}>
                                                                <EditableSpan title={spec.description}
                                                                              inputClassName={s.inputEditableSpan}
                                                                              onChangeInput={(newInputValue) => {
                                                                                  onChangeSpecificationHandler(newInputValue, field, spec)
                                                                              }}
                                                                />
                                                            </div>
                                                            <DeleteButton size={25} onClick={() => {deleteSpecificationHandler(field, spec)}}/>
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
                            onChange={(value) => {setSelectedSpecification(value as ProductSpecificationBind)}}
                            getOptionLabel={label => label!.name}
                            getOptionValue={value => value!.name}
                            noOptionsMessage={() => 'Характеристика не найдена'}
                        />
                    </div>
                </div>
            }
        />
    )
}