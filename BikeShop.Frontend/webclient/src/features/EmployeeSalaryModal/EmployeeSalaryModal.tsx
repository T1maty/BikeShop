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

    const currentEmployee = useEmployeeSalaryModal(s => s.currentEmployee)
    const setCurrentEmployee = useEmployeeSalaryModal(s => s.setCurrentEmployee)
    const getEmployeeInfo = useEmployeeSalaryModal(s => s.getEmployeeInfo)

    const [employers, setEmployers] = useState([
        {id: 1, name: 'Петров Василй Иванович'},
        {id: 2, name: 'Петров Василй Петрович'},
        {id: 3, name: 'Иваной Андрей Иванович'},
        {id: 4, name: 'Сидоров Игорь Васильевич'},
        {id: 5, name: 'Никифоров Константин Александрович'},
        {id: 6, name: 'Никифоров Константин Александрович'},
        {id: 7, name: 'Никифоров Константин Александрович'},
    ])

    const formControl = useForm<any>({
        // defaultValues: {
        //     id: 0,
        //     moneyPerHour: 0,
        //     percentFromSaleShop: 0,
        //     percentFromServiceWorks: 0,
        //     percentFromSaleServices: 0,
        // }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        // if (currentEmployee === null) {
        //     addNewShop(data)
        // }
        // if (currentEmployee !== null) {
        //     updateShopInfo(data)
        // }
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentEmployee ? currentEmployee.id : 0)
        // formControl.setValue('moneyPerHour', currentEmployee ? currentEmployee.moneyPerHour : 0)
        // formControl.setValue('percentFromSaleShop', currentEmployee ? currentEmployee.percentFromSaleShop : 0)
        // formControl.setValue('percentFromServiceWorks', currentEmployee ? currentEmployee.percentFromServiceWorks : 0)
        // formControl.setValue('percentFromSaleServices', currentEmployee ? currentEmployee.percentFromSaleServices : 0)
    }, [currentEmployee])

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
                    <div className={s.employeeSalaryModal_title}>
                        Зарплата сотрудников
                    </div>
                    <div className={s.employeeSalaryModal_content}>
                        <div className={s.content_employeeList}>
                            {
                                employers.map(em => {
                                    return (
                                        <div key={em.id}
                                             className={em.id === currentEmployee?.id ?
                                                 s.employeeList_item_active : s.employeeList_item}
                                             onClick={() => {setCurrentEmployee(em)}}
                                        >
                                            {em.name}
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className={s.content_employeeData}>
                            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                                <div className={s.employeeData_inputs}>
                                    <ControlledCustomInput name={'moneyPerHour'}
                                                           placeholder={'Ставка за час'}
                                                           control={formControl}
                                                           // rules={{required: Errors[0].name}}
                                    />
                                    <ControlledCustomInput name={'percentFromSaleShop'}
                                                           placeholder={'Процент от продаж магазина'}
                                                           control={formControl}
                                    />
                                    <ControlledCustomInput name={'percentFromServiceWorks'}
                                                           placeholder={'Процент от услуг ремонтов'}
                                                           control={formControl}
                                    />
                                    <ControlledCustomInput name={'percentFromSaleServices'}
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
                                        // onClick={() => {setCurrentEmployee(null)}}
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