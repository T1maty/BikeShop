import React, {useState} from 'react';
import s from "./EditProductCardModal.module.scss";
import {Button, EditableSpan} from "../../../shared/ui";
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg";
import Select from "react-select";
import useEditProductCardModal from "./EditProductCardModalStore";
import {Controller, UseFormReturn} from "react-hook-form";
import {ProductSpecification} from "../../../entities";

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
    divClassName?: any
    disabled?: boolean
}

const EditProductCardSpecifications = (props: ControlledProps) => {

    const specifications = useEditProductCardModal(s => s.specifications)
    const [selectedSpecification, setSelectedSpecification] = useState<ProductSpecification>({} as ProductSpecification) // характеристика (spec)

    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}: any) =>


                    <div className={s.rightSide_productDetails}>
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
                                                                                      field.onChange(field.value.map((n: ProductSpecification) => n.id === spec.id ?
                                                                                          {
                                                                                              ...n,
                                                                                              description: newInputValue
                                                                                          } : n))
                                                                                  }}
                                                                    />
                                                                </div>
                                                                <div className={s.item_deleteDetailsItem}>
                                                                    <img src={RemoveIcon} alt="remove-icon"
                                                                         onClick={() => {
                                                                             field.onChange(field.value.filter((n: ProductSpecification) => n.id != spec.id))
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
                                        field.onChange([...field.value, {
                                            ...selectedSpecification,
                                            description: 'Введите описание характеристики'
                                        }])
                                        setSelectedSpecification({} as ProductSpecification)
                                    }}
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
                                onChange={(value) => {
                                    setSelectedSpecification(value as ProductSpecification)
                                }}
                                getOptionLabel={label => label!.name}
                                getOptionValue={value => value!.name}
                                noOptionsMessage={() => 'Характеристика не найдена'}
                            />
                        </div>
                    </div>
                }
            />
        </div>

    );
};

export default EditProductCardSpecifications;