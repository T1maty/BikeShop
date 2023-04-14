import React, {useState} from 'react'
import s from "./EditProductCardOptionBind.module.scss"
import {Button} from "../../../shared/ui"
import Select from "react-select"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import {ProductFullData, ProductImage} from "../../../entities"

interface ProductCardOptionBindProps {
    product: ProductFullData
}

export const EditProductCardOptionBind = (props: ProductCardOptionBindProps) => {

    const [selectedOption, setSelectedOption] = useState<any>(null)

    return (
        <div className={s.editProductCardOptionBind}>
            {/*<Controller*/}
            {/*    name={props.name}*/}
            {/*    control={props.control.control}*/}
            {/*    render={({field}: any) =>*/}

            <>
                <Button buttonDivWrapper={s.addButton}
                        onClick={() => {}}
                >
                    Добавить бинд товара
                </Button>

                <div className={s.optionBind_productBlock}>
                    <div className={s.productBlock_control}>
                        <div className={s.contentBlock_deleteImg}>
                            <img src={RemoveIcon} alt="remove-icon" onClick={() => {}}/>
                        </div>
                        <div className={s.productImage}>
                            <img src={props.product.productImages[0].url} alt="product-image"/>
                        </div>
                    </div>


                    <div className={s.productBlock_productContent}>
                        <div className={s.productContent_info}>
                            ID: {props.product.product.id} {'|'} {''}
                            {props.product.product.name} {'|'} {''}
                            Catalog Key: {props.product.product.catalogKey}
                        </div>
                        <div className={s.productContent_contentBlock}>
                            <div className={s.contentBlock_content}>
                                <div className={s.content_options}>
                                    <fieldset className={s.options_wrapperBox}>
                                        <legend>Опции</legend>
                                        <div className={s.options_selectRow}>
                                            <div className={s.options_select}>
                                                <Select
                                                    className={s.options_search}
                                                    // options={}
                                                    placeholder={'Опции'}
                                                    isSearchable={false}
                                                    value={selectedOption}
                                                    onChange={(value: any) => {
                                                        setSelectedOption(value)
                                                    }}
                                                    getOptionLabel={label => label!.name}
                                                    getOptionValue={value => value!.name}
                                                    noOptionsMessage={() => 'Опция не найдена'}
                                                />
                                            </div>
                                            <Button buttonDivWrapper={s.options_addButton}
                                                    onClick={() => {}}
                                            >
                                                +
                                            </Button>
                                        </div>
                                        <div className={s.options_list}>
                                            Список выбранных селектов
                                        </div>
                                    </fieldset>
                                </div>

                                <div className={s.content_tags}>
                                    <fieldset className={s.tags_wrapperBox}>
                                        <legend>Индивидуальные теги</legend>
                                        <Button buttonDivWrapper={s.tags_addButton}
                                                onClick={() => {}}
                                        >
                                            +
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
            </>

            {/*}*/}
            {/*/>*/}
        </div>
    )
}