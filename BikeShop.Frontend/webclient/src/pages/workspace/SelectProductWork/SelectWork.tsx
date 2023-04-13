import React, {useEffect, useState} from 'react'
import s from './SelectProductWork.module.scss'
import {Button, InputUI, UniTable} from "../../../shared/ui"
import {useWorkCatalog} from "../../../widgets/workspace/WorkCatalog/TableCatalogStore";
import {ServiceItemWork} from "../../../entities/models/Service/ServiceItem";
import {WorkCatalogTreeView} from "../../../widgets/workspace/WorkCatalog/WorkCatalogTreeView";
import {columns} from "./SlaveTableConfig";
import {WorkCatalogTable} from "../../../widgets";

interface props {
    works: ServiceItemWork[]
    setWorks: (work: ServiceItemWork[]) => void
}

export const SelectWork = (props: props) => {

    const {getGroup} = useWorkCatalog(state => state)

    const [selected, setSelected] = useState([])


    useEffect(() => {
        getGroup()
    }, [])

    return (
        <div className={s.selectProduct_mainBox}>
            <div className={s.selectProduct_mainBox_leftSide}>
                <div className={s.leftSide_treeView}>
                    <WorkCatalogTreeView/>
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


                    <WorkCatalogTable onRowDoubleClick={(row) => {
                        let works = props.works
                        let exist = works.find(n => n.id === row.id)

                        if (exist != undefined) {
                            exist.quantity++
                            props.setWorks(works)

                        } else {
                            let work = row as ServiceItemWork
                            work.quantity = 1
                            works.push(work)
                            props.setWorks(works)

                        }
                    }}/>

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
                    <UniTable rows={props.works} setRows={props.setWorks} columns={columns} selected={selected}
                              setSelected={setSelected}/>
                </div>
            </div>
        </div>
    )
}