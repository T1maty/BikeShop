import React, {useEffect} from 'react'
import s from './EmployeeSalaryModal.module.scss'
import {Button, ControlledCustomInput, CustomModal, LoaderScreen} from '../../shared/ui'
import {useSnackbar} from 'notistack'
import useEmployeeSalaryModal from "./EmployeeSalaryModalStore"
import {SubmitHandler, useForm} from "react-hook-form"
import {UpdateSalaryParams, UserNew} from '../../entities'

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
    const currentEmployeeSalary = useEmployeeSalaryModal(s => s.currentEmployeeSalary)

    const getEmployeeSalary = useEmployeeSalaryModal(s => s.getEmployeeSalary)
    const updateEmployeeSalary = useEmployeeSalaryModal(s => s.updateEmployeeSalary)

    const formControl = useForm<UpdateSalaryParams>({
        defaultValues: {
            userId: '',
            rate: 0,
            shopPercent: 0,
            workPercent: 0,
            workshopPercent: 0,
        }
    })

    const onSubmit: SubmitHandler<UpdateSalaryParams> = (data: UpdateSalaryParams) => {
        if (currentEmployee !== null) {
            data.userId = currentEmployee.user.id
            console.log(data)
            updateEmployeeSalary(data)
        }
    }

    const selectCurrentEmployeeHandler = (employee: UserNew) => {
        setCurrentEmployee(employee)
        getEmployeeSalary(employee.user.id)
        formControl.setValue('rate', currentEmployeeSalary.rate)
        formControl.setValue('shopPercent', currentEmployeeSalary.shopPercent)
        formControl.setValue('workPercent', currentEmployeeSalary.workPercent)
        formControl.setValue('workshopPercent', currentEmployeeSalary.workshopPercent)
    }

    useEffect(() => {
        formControl.setValue('userId', currentEmployeeSalary ? currentEmployeeSalary.userId : '')
        formControl.setValue('rate', currentEmployeeSalary ? currentEmployeeSalary.rate : 0)
        formControl.setValue('shopPercent', currentEmployeeSalary ? currentEmployeeSalary.shopPercent : 0)
        formControl.setValue('workPercent', currentEmployeeSalary ? currentEmployeeSalary.workPercent : 0)
        formControl.setValue('workshopPercent', currentEmployeeSalary ? currentEmployeeSalary.workshopPercent : 0)
    }, [currentEmployeeSalary])

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        open ? getEmployersList() : false
    }, [open])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <div className={s.employeeSalaryModal_mainBlock}>
                    <div className={s.employeeSalaryModal_title}>
                        Зарплата сотрудников
                    </div>
                    <div className={s.employeeSalaryModal_content}>
                        <div className={s.content_scrollWrapper}>
                            <div className={s.content_employeeList}>
                                {
                                    employers.length === 0 ? <div style={{textAlign: 'center'}}>Список пуст</div> :

                                        employers.map(em => {
                                            return (
                                                <div key={em.user.id}
                                                     className={em.user.id === currentEmployee?.user.id ?
                                                         s.employeeList_item_active : s.employeeList_item}
                                                     onClick={() => {
                                                         selectCurrentEmployeeHandler(em)
                                                     }}
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
                                    <div className={s.employeeData_inputsItem}>
                                        <div>Ставка за час</div>
                                        <ControlledCustomInput name={'rate'}
                                                               placeholder={'Ставка за час'}
                                                               control={formControl}
                                        />
                                    </div>
                                    <div className={s.employeeData_inputsItem}>
                                        <div>Процент от продаж магазина</div>
                                        <ControlledCustomInput name={'shopPercent'}
                                                               placeholder={'Процент от продаж магазина'}
                                                               control={formControl}
                                        />
                                    </div>
                                    <div className={s.employeeData_inputsItem}>
                                        <div>Процент от услуг ремонтов</div>
                                        <ControlledCustomInput name={'workPercent'}
                                                               placeholder={'Процент от услуг ремонтов'}
                                                               control={formControl}
                                        />
                                    </div>
                                    <div className={s.employeeData_inputsItem}>
                                        <div>Процент от продаж ремонтов</div>
                                        <ControlledCustomInput name={'workshopPercent'}
                                                               placeholder={'Процент от продаж ремонтов'}
                                                               control={formControl}
                                        />
                                    </div>

                                    <Button buttonDivWrapper={s.inputs_cancelBtn}
                                            disabled={currentEmployee === null}
                                            onClick={() => {
                                                setCurrentEmployee(null);
                                                formControl.reset()
                                            }}
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