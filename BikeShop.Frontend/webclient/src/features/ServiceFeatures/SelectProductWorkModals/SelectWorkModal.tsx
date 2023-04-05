import React from 'react'
import s from './SelectProductWorkModal.module.scss'
import useSelectProductWorkModal from './SelectProductWorkModalStore'
import {SelectWork} from '../../../pages'
import {ServiceItemWork} from "../../../entities/models/Service/ServiceItem"
import {CustomModal} from "../../../shared/ui"

interface props {
    works: ServiceItemWork[]
    setWorks: (product: ServiceItemWork[]) => void
}

export const SelectWorkModal = (props: props) => {

    const selectWorkModal = useSelectProductWorkModal(s => s.openSelectWorkModal)
    const setSelectWorkModal = useSelectProductWorkModal(s => s.setOpenSelectWorkModal)

    return (
        <CustomModal
            open={selectWorkModal}
            onClose={() => {setSelectWorkModal(false)}}
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectWork setWorks={props.setWorks} works={props.works}/>
            </div>
        </CustomModal>
    )
}