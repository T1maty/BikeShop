import React, {useEffect, useState} from 'react'
import s from './Workshop.module.scss'
import clsx from "clsx"
import WorkshopPhoto01 from '../../../../shared/assets/shop/images/workshop-01.jpg'
import WorkshopPhoto02 from '../../../../shared/assets/shop/images/workshop-02.jpg'
import WorkshopPhoto03 from '../../../../shared/assets/shop/images/workshop-03.jpg'
import WorkshopPhoto04 from '../../../../shared/assets/shop/images/workshop-04.jpg'
import ArrowLeft from '../../../../shared/assets/shop/icons/arrow-left.svg'
import ArrowRight from '../../../../shared/assets/shop/icons/arrow-right.svg'

type WorkshopDataType = {
    id: number
    description: string
    imageUrl: string
    title: string
    workLink: string
}

export const Workshop = () => {

    const [currentData, setCurrentData] = useState<WorkshopDataType>({} as WorkshopDataType)

    const [workshopData, setWorkshopData] = useState<WorkshopDataType[]>([
        {
            id: 0, description: 'Мы занимаемся профессиональным сервисом велосипедов любой сложности, ' +
                'наша команда предоставит вам консультацию и поможет с подбором правильных ' +
                'велокомпонентов. Отремонтируем всё: от вилки до втулки, тормоза, цепь и пр.',
            imageUrl: WorkshopPhoto01, title: 'Ремонт комплектующих', workLink: ''
        },
        {
            id: 1, description: 'Мы занимаемся профессиональным сервисом велосипедов любой сложности',
            imageUrl: WorkshopPhoto02, title: 'Сборка велосипеда', workLink: ''
        },
        {
            id: 2, description: 'Отремонтируем всё: от вилки до втулки, тормоза, цепь и пр.',
            imageUrl: WorkshopPhoto03, title: 'Заказ запчастей', workLink: ''
        },
        {
            id: 3, description: 'Сделаем всё по высшему разряду!',
            imageUrl: WorkshopPhoto04, title: 'Индивидуальный подход', workLink: ''
        },
    ])

    useEffect(() => {
        setCurrentData(workshopData[0])
    }, [])

    return (
        <div className={s.workshop_mainBox}>
            <div className={s.container}>
                <div className={s.workshopData}>
                    {
                        currentData &&
                        <>
                            <div className={s.workshop_description}>
                                <div className={s.description_title}>{currentData.title}</div>
                                <div className={s.description_contentBox}>
                                    <div className={s.description_content}>
                                        {currentData.description}
                                    </div>
                                </div>
                                <div className={s.description_details}>Подробнее</div>
                                <div className={s.data_length}>
                                    <div className={clsx({[s.endLength]: currentData.id === 0})}
                                         onClick={() => {
                                             if (currentData.id === 0) return
                                             if (currentData) setCurrentData(workshopData[currentData.id - 1])
                                         }}
                                    >
                                        <img src={ArrowLeft} alt='arrow-left' width={20} height={20}/>
                                    </div>
                                    {
                                        workshopData.map(el => {
                                            return (
                                                <div key={el.id}
                                                     className={currentData.id === el.id ? s.bullet_item_active : s.bullet_item}
                                                     onClick={() => {setCurrentData(workshopData[el.id])}}
                                                >
                                                </div>
                                            )
                                        })
                                    }
                                    <div className={clsx({[s.endLength]: currentData.id === workshopData.length - 1})}
                                         onClick={() => {
                                             if (currentData.id === workshopData.length - 1) return
                                             if (currentData) setCurrentData(workshopData[currentData.id + 1])
                                         }}
                                    >
                                        <img src={ArrowRight} alt='arrow-right' width={20} height={20}/>
                                    </div>
                                </div>
                            </div>


                            <div className={s.workshop_photos}>
                                {
                                    workshopData.map(el => {
                                        return (
                                            <div key={el.id}
                                                 className={currentData.id === el.id ? s.workshop_photo_active : s.workshop_photo}
                                            >
                                                <div className={s.photo}
                                                     onClick={() => {
                                                         // @ts-ignore
                                                         setCurrentData(workshopData.find(newEl => newEl.id === el.id))
                                                     }}
                                                >
                                                    <img src={el.imageUrl} alt='workshop-photo'/>
                                                </div>
                                                <div className={s.title}>
                                                    {currentData.id !== el.id ? el.title : ''}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}