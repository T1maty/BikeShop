import React from 'react'
import s from './SelectProductWorkModal.module.scss'
import useSelectProductWorkModal from './SelectProductWorkModalStore'
import {SelectWork} from '../../../pages'
import {CustomModal} from "../../../shared/ui"
import {ServiceWork} from "../../../entities"

interface SelectWorkModalProps {
    defaultMasterId: string
    serviceId: number
    works: ServiceWork[]
    setWorks: (product: ServiceWork[]) => void
}

export const SelectWorkModal = (props: SelectWorkModalProps) => {

    const selectWorkModal = useSelectProductWorkModal(s => s.openSelectWorkModal)
    const setSelectWorkModal = useSelectProductWorkModal(s => s.setOpenSelectWorkModal)

    return (
        <CustomModal
            open={selectWorkModal}
            onClose={() => {setSelectWorkModal(false)}}
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectWork setWorks={props.setWorks}
                            works={props.works}
                            defaultMasterId={props.defaultMasterId}
                            serviceId={props.serviceId}
                />
            </div>
        </CustomModal>
    )
}