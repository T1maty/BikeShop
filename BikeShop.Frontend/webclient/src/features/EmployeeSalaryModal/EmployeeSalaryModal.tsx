import React, {useState, useEffect} from 'react'
import s from './EmployeeSalaryModal.module.scss'
import {Button, ControlledCustomInput, CustomModal, LoaderScreen} from '../../shared/ui'
import {useSnackbar} from 'notistack'
import useEmployeeSalaryModal from "./EmployeeSalaryModalStore"
import {SubmitHandler, useForm} from "react-hook-form"
import {Errors} from "../../entities/errors/workspaceErrors"

export const EmployeeSalaryModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useEmployeeSalaryModal(s => s.openEmployeeSalaryModal)
    const setOpen = useEmployeeSalaryModal(s => s.setOpenEmployeeSalaryModal)
    const isLoading = useEmployeeSalaryModal(s => s.isLoading)
    const errorStatus = useEmployeeSalaryModal(s => s.errorStatus)

    const employers = useEmployeeSalaryModal(s => s.employers)
    const getEmployersList = useEmployeeSalaryModal(s => s.getEmployersList)

    const currentEmployee = useEmployeeSalaryModal(s => s.currentEmployee)
    const setCurrentEmployee = useEmployeeSalaryModal(s => s.setCurrentEmployee)
    const getEmployeeSalary = useEmployeeSalaryModal(s => s.getEmployeeSalary)
    const updateEmployeeSalary = useEmployeeSalaryModal(s => s.updateEmployeeSalary)

    const formControl = useForm<any>({
        defaultValues: {
            id: 0,
            rate: 0,
            shopPercent: 0,
            workPercent: 0,
            workShopPercent: 0,
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        if (currentEmployee !== null) {
            data.userId = currentEmployee.user.id
            console.log(data)
            updateEmployeeSalary(data)
        }
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentEmployee ? currentEmployee.user.id : 0)
        // formControl.setValue('moneyPerHour', currentEmployee ? currentEmployee.rate : 0)
        // formControl.setValue('percentFromSaleShop', currentEmployee ? currentEmployee.shopPercent : 0)
        // formControl.setValue('percentFromServiceWorks', currentEmployee ? currentEmployee.workPercent : 0)
        // formControl.setValue('percentFromSaleServices', currentEmployee ? currentEmployee.workShopPercent : 0)
    }, [currentEmployee])

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        getEmployersList()
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
                    <div className={s.employeeSalaryModal_title}>
                        Зарплата сотрудников
                    </div>
                    <div className={s.employeeSalaryModal_content}>
                        <div className={s.content_scrollWrapper}>
                            <div className={s.content_employeeList}>
                                {
                                    employers.length === 0 ? <div>Список пуст</div> :

                                    employers.map(em => {
                                        return (
                                            <div key={em.user.id}
                                                 className={em.user.id === currentEmployee?.user.id ?
                                                     s.employeeList_item_active : s.employeeList_item}
                                                 onClick={() => {setCurrentEmployee(em)}}
                                            >
                                                {em.user.lastName} {em.user.firstName} {em.user.patronymic}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className={s.content_employeeData}>
                            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                                <div className={s.employeeData_inputs}>
                                    <ControlledCustomInput name={'rate'}
                                                           placeholder={'Ставка за час'}
                                                           control={formControl}
                                                           // rules={{required: Errors[0].name}}
                                    />
                                    <ControlledCustomInput name={'shopPercent'}
                                                           placeholder={'Процент от продаж магазина'}
                                                           control={formControl}
                                    />
                                    <ControlledCustomInput name={'workPercent'}
                                                           placeholder={'Процент от услуг ремонтов'}
                                                           control={formControl}
                                    />
                                    <ControlledCustomInput name={'workShopPercent'}
                                                           placeholder={'Процент от продаж ремонтов'}
                                                           control={formControl}
                                    />
                                    <Button buttonDivWrapper={s.inputs_cancelBtn}
                                            disabled={currentEmployee === null}
                                            onClick={() => {setCurrentEmployee(null)}}
                                    >
                                        Отмена
                                    </Button>
                                </div>

                                <Button type={'submit'}
                                        buttonDivWrapper={s.employeeData_saveBtn}
                                        disabled={currentEmployee === null}
                                >
                                    Сохранить
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </CustomModal>
        )
    }
}