import React, {useEffect} from 'react'
import s from './EmployeeSalaryModal.module.scss'
import {CustomModal, LoaderScreen} from '../../shared/ui'
import {useSnackbar} from 'notistack'
import useEmployeeSalaryModal from "./EmployeeSalaryModalStore"

export const EmployeeSalaryModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useEmployeeSalaryModal(s => s.openEmployeeSalaryModal)
    const setOpen = useEmployeeSalaryModal(s => s.setOpenEmployeeSalaryModal)
    const isLoading = useEmployeeSalaryModal(s => s.isLoading)
    const errorStatus = useEmployeeSalaryModal(s => s.errorStatus)
    const getEmployeeInfo = useEmployeeSalaryModal(s => s.getEmployeeInfo)

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        // getEmployeeInfo()
    }, [])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <div className={s.employeeSalaryModal_mainBlock}>
                    <div className={s.employeeSalaryModal_title}>Зарплата сотрудников</div>
                    <div className={s.employeeSalaryModal_content}>
                        Modal
                    </div>
                </div>
            </CustomModal>
        )
    }
}