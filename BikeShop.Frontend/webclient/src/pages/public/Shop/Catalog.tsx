import React, {useState, useEffect} from 'react'
import s from './Catalog.module.scss'
import SortThumbnails from '../../../shared/assets/shop/icons/sort-thumbnails.png'
import SortList from '../../../shared/assets/shop/icons/sort-list.png'

type FilterProductsType = 'Popular' | 'Cheap' | 'Expensive' | 'New'

export const Catalog = () => {

    const [filterStatus, setFilterStatus] = useState<FilterProductsType>('Popular')
    const [activeFilter1, setActiveFilter1] = useState<boolean>(false)
    const [activeFilter2, setActiveFilter2] = useState<boolean>(false)
    const [activeFilter3, setActiveFilter3] = useState<boolean>(false)
    const [activeFilter4, setActiveFilter4] = useState<boolean>(false)

    const [viewType, setViewType] = useState([
        {
            id: '1',
            icon: SortThumbnails,
            func: () => {
                //
            }
        },
        {
            id: '2',
            icon: SortList,
            func: () => {
                //
            }
        },
    ])

    const filterUniversalHandler = (filterName: FilterProductsType,
                                    activeFilter1: boolean, activeFilter2: boolean,
                                    activeFilter3: boolean, activeFilter4: boolean) => {

        // setFilter(services.filter(serv => serv.status === filterName))
        setFilterStatus(filterName)
        setActiveFilter1(activeFilter1)
        setActiveFilter2(activeFilter2)
        setActiveFilter3(activeFilter3)
        setActiveFilter4(activeFilter4)
    }

    useEffect(() => {
        setActiveFilter1(true)
    }, [])

    return (
        <div className={s.catalog_mainBox}>
            <div className={s.catalog_left}>Категории</div>
            <div className={s.catalog_right}>
                <div className={s.right_cloudCategory}>
                    <div className={s.cloudCategory_title}>Облако категорий</div>
                    <div className={s.cloudCategory_content}>Категории</div>
                </div>
                <div className={s.right_filters}>
                    <div className={s.filter_buttons}>
                        <div>Сначала:</div>
                        <div className={activeFilter1 ? s.filter_itemActive : s.filter_item}
                             onClick={()=> {filterUniversalHandler('Popular',
                                 true, false, false, false)}}
                        >
                            Популярные
                        </div>
                        <div className={activeFilter2 ? s.filter_itemActive : s.filter_item}
                             onClick={()=> {filterUniversalHandler('Cheap',
                                 false, true, false, false)}}
                        >
                            Недорогие
                        </div>
                        <div className={activeFilter3 ? s.filter_itemActive : s.filter_item}
                             onClick={()=> {filterUniversalHandler('Expensive',
                                 false, false, true, false)}}
                        >
                            Дорогие
                        </div>
                        <div className={activeFilter4 ? s.filter_itemActive : s.filter_item}
                             onClick={()=> {filterUniversalHandler('New',
                                 false, false, false, true)}}
                        >
                            Новинки
                        </div>
                    </div>
                    <div className={s.filter_viewType}>
                        {viewType.map(item => (
                            <div className={s.viewType_item}
                                 key={item.id}
                                 onClick={item.func}
                            >
                                <img src={item.icon} alt='view-type_icon'/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.right_content}>Контент</div>
                <div className={s.right_paginator}>Пагинатор</div>
            </div>
        </div>
    )
}