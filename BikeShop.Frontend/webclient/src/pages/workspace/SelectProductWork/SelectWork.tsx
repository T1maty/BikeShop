import React, {useEffect, useState} from 'react'
import s from './SelectProductWork.module.scss'
import {Button, UniTable} from '../../../shared/ui'
import {useWorkCatalog} from "../../../widgets/workspace/WorkCatalog/TableCatalogStore"
import {WorkCatalogTreeView} from "../../../widgets/workspace/WorkCatalog/WorkCatalogTreeView"
import {columns} from "./SlaveTableConfig"
import {WorkCatalogTable} from "../../../widgets"
import {ServiceWork, Work} from "../../../entities"
import useSelectProductWorkModal
    from "../../../features/ServiceFeatures/SelectProductWorkModals/SelectProductWorkModalStore"
import {AsyncSelectSearchWork} from "../../../shared/ui/AsyncSelectSearch/AsyncSelectSearchWork"

interface SelectWorkProps {
    defaultMasterId: string
    serviceId: number
    works: ServiceWork[]
    setWorks: (work: ServiceWork[]) => void
}

export const SelectWork = (props: SelectWorkProps) => {

    const setOpenSelectWorkModal = useSelectProductWorkModal(s => s.setOpenSelectWorkModal)
    const {getGroup} = useWorkCatalog(state => state)
    const [selected, setSelected] = useState<any>([])

    useEffect(() => {
        getGroup()
    }, [])

    const addWorkHandler = (row: Work) => {
        let works = props.works
        let exist = works.find(n => n.workId === row.id)

        if (exist != undefined) {
            exist.quantity++
            props.setWorks(works)
        } else {
            works.push(
                {
                    id: 0,
                    createdAt: Date.now().toString(),
                    updatedAt: Date.now().toString(),
                    enabled: true,
                    workId: row.id,
                    complicationPrice: 0,
                    name: row.name,
                    description: '',
                    quantity: 1,
                    price: row.price,
                    discount: 0,
                    total: row.price,
                    userId: props.defaultMasterId,
                    serviceId: props.serviceId
                } as ServiceWork)
            props.setWorks(works)
        }
    }

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
                            setOpenSelectWorkModal(false)
                        }}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>

            <div className={s.selectProduct_mainBox_rightSide}>
                <div className={s.rightSide_availableProducts}>
                    <WorkCatalogTable onRowDoubleClick={addWorkHandler}/>
                </div>

                <div className={s.rightSide_infoRow}>
                    <div className={s.infoRow_searchField}>
                        <AsyncSelectSearchWork onSelect={addWorkHandler}/>
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
                    <UniTable rows={props.works}
                              setRows={props.setWorks}
                              columns={columns}
                              selected={selected}
                              setSelected={setSelected}
                    />
                </div>
            </div>
        </div>
    )
}