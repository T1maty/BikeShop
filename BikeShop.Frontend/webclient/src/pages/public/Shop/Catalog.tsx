import React from 'react'
import s from './Catalog.module.scss'

export const Catalog = () => {
    return (
        <div className={s.catalog_mainBox}>
            <div className={s.catalog_left}>Категории</div>
            <div className={s.catalog_right}>
                <div className={s.right_cloudCategory}>
                    <div className={s.cloudCategory_title}>Облако категорий</div>
                    <div className={s.cloudCategory_content}>Категории</div>
                </div>
                <div className={s.right_filters}>
                    <div className={s.filters_buttons}>
                        <div>Сначала:</div>
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                    </div>
                    <div className={s.filters_listType}>
                        <div>1</div>
                        <div>2</div>
                    </div>
                </div>
                <div className={s.right_content}>Контент</div>
                <div className={s.right_paginator}>Пагинатор</div>
            </div>
        </div>
    )
}