import React, {useEffect} from 'react'
import s from './SelectProductWork.module.scss'
import {Button, InputUI} from "../../../shared/ui"
import {useWorkCatalog} from "../../../widgets/workspace/WorkCatalog/TableCatalogStore";

import {CustomTable} from "../../../shared/ui/CustomTable/CustomTable";
import {ServiceItemWork} from "../../../entities/models/ServiceItem";

interface props {
    works: ServiceItemWork[]
    setWorks: (product: ServiceItemWork[]) => void
}

export const SelectWork = (props: props) => {
    const {works, group, getWork, getGroup, chooseMethod, isLoading} = useWorkCatalog(state => state)
    const contextDataTreeView = ['Редактировать', 'Создать в корне', 'Создать потомка', 'Переместить', 'Удалить']
    const contextDataTable = ['Редактировать', 'Создать', 'Статистика']
    const theadData = ["Артикул", "Название", "Цена", "Описание"]

    useEffect(() => {
        getGroup()
    }, [])

    const callBackDataTable = (data: object) => {
        chooseMethod(data)
    }
    const callBackDataTreeView = (data: object) => {

    }
    return (
        <div className={s.selectProduct_mainBox}>
            <div className={s.selectProduct_mainBox_leftSide}>
                <div className={s.leftSide_treeView}>
                    
                </div>
                <div className={s.leftSide_buttons}>
                    <div>
                        <Button onClick={() => {
                        }}>
                            Подтвердить
                        </Button>
                    </div>
                    <div>
                        <Button onClick={() => {
                        }}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>

            <div className={s.selectProduct_mainBox_rightSide}>
                <div className={s.rightSide_availableProducts}>

                    <CustomTable tbodyData={works}
                                 theadData={theadData}
                                 callBackData={callBackDataTable}
                                 isLoading={isLoading}
                                 contextData={contextDataTable}
                                 onRowDoubleClick={(row) => {
                                     props.setWorks([...props.works, row as ServiceItemWork])
                                 }}
                    />
                </div>
                <div className={s.rightSide_infoRow}>
                    <div className={s.infoRow_searchField}>
                        <InputUI placeholder={'Поиск...'} clearInputValue={() => {
                        }}/>
                    </div>
                    <div className={s.infoRow_result}>
                        <div className={s.result_sum}>
                            Скидка1
                        </div>
                        <div className={s.result_sum}>
                            Скидка2
                        </div>
                        <div className={s.result_sum}>
                            Скидка3
                        </div>
                    </div>
                </div>
                <div className={s.rightSide_chosenProducts}>
                    <CustomTable tbodyData={props.works}
                                 theadData={theadData}
                                 callBackData={() => {
                                 }}
                                 isLoading={isLoading}
                                 contextData={contextDataTable}

                    />
                </div>
            </div>
        </div>
    )
}