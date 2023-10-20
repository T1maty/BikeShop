import React from 'react';
import s from './CardCatalogFilters.module.scss'
import useCardCatalogStore from "../CardCatalogStore";
import {DeleteButton} from "../../../../shared/ui";
import Enumerable from "linq";
import {useApp} from "../../../../entities/globalStore/AppStore";

const CardCatalogFilters = () => {
    const catalogState = useCardCatalogStore(s => s.catalogState)
    const setSelectedOptions = useCardCatalogStore(s => s.setSelectedOptions)
    const selectedOptions = useCardCatalogStore(s => s.selectedOptions)
    const isLoading = useApp(s => s.isLoading)

    let sections = Enumerable.from(catalogState ? catalogState.options : []).distinct(n => n.optionId).toArray()

    return (
        <div className={s.wrapper}>
            <div className={s.selected}>
                <div className={s.sel_head}>
                    <div>Обрані фільтри:</div>
                    <DeleteButton size={25} onClick={() => setSelectedOptions([])}/>
                </div>
                <div className={s.sel_content}>
                    {catalogState?.filterSettings.map(optionVariantId => {
                        return (
                            <div
                                onClick={() => setSelectedOptions(selectedOptions.filter(n => n != optionVariantId))}
                                className={s.sel_item}>
                                <div>{catalogState?.options.find(n => n.id === optionVariantId)?.name}</div>
                                <DeleteButton size={15} onClick={() => {
                                }}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={s.available}>
                <div className={s.av_head}>
                    <div>Доступні фільтри:</div>

                </div>
                <div className={s.av_content}>
                    {sections.map(section =>
                        <div className={s.av_section}>
                            <div className={s.av_section_label}>{section.optionName}</div>
                            {catalogState?.options.filter(n => !selectedOptions.includes(n.id) && n.optionId === section.optionId).map(option => {
                                return (
                                    <div className={s.av_item} onClick={() => {
                                        setSelectedOptions([...selectedOptions, option.id])
                                    }}>
                                        {option.name}
                                    </div>
                                )
                            })}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CardCatalogFilters;