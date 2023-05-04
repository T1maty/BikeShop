import React, {useEffect} from 'react'
import s from './AdminControlSalary.module.scss'
import {Button, ControlledCustomInput, LoaderScreen} from '../../../shared/ui'
import {SubmitHandler, useForm} from 'react-hook-form'
import useAdminControl from './AdminControlStore'
import {useSnackbar} from 'notistack'

export const AdminControlSalary = () => {

    const {enqueueSnackbar} = useSnackbar()

    const isLoading = useAdminControl(s => s.isLoading)
    const errorStatus = useAdminControl(s => s.errorStatus)

    const formControl = useForm<any>({
        defaultValues: {
            userId: '',
            rate: 0,
            shopPercent: 0,
            workPercent: 0,
            workshopPercent: 0,
            sum: 0,
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        // if (currentEmployee !== null) {
        //     data.userId = currentEmployee.user.id
        //     console.log(data)
        //     updateEmployeeSalary(data)
        // }
    }

    useEffect(() => {
        // formControl.setValue('userId', currentEmployeeSalary ? currentEmployeeSalary.userId : '')
        // formControl.setValue('rate', currentEmployeeSalary ? currentEmployeeSalary.rate : 0)
        // formControl.setValue('shopPercent', currentEmployeeSalary ? currentEmployeeSalary.shopPercent : 0)
        // formControl.setValue('workPercent', currentEmployeeSalary ? currentEmployeeSalary.workPercent : 0)
        // formControl.setValue('workshopPercent', currentEmployeeSalary ? currentEmployeeSalary.workshopPercent : 0)
    }, [])

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        // getEmployersList()
    }, [])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <div className={s.stuffProfileWork_mainBlock}>

                    <div className={s.stuffProfileWork_title}>
                        Отработка
                    </div>
                    <div className={s.stuffProfileWork_hours}>
                        <div>Смен: 20</div>
                        <div>Часов: 200</div>
                    </div>

                    <div className={s.stuffProfileWork_salary}>
                        <fieldset>
                            <legend>Зарплата на текущий момент</legend>
                            <div className={s.salary_info}>
                                <div className={s.salary_info1}>
                                    <div>Ремонты:</div>
                                    <div>Продажа ремонтов:</div>
                                    <div>Продажи:</div>
                                    <div>Ставка:</div>
                                </div>
                                <div className={s.salary_info2}>
                                    <div>Бонусы:</div>
                                    <div>Штрафы:</div>
                                </div>
                                <div className={s.salary_result}>Итого:</div>
                            </div>
                        </fieldset>
                    </div>

                    <div className={s.controlBlock}>
                        <div style={{marginBottom: '10px'}}>
                            Сумма выплаты:
                        </div>
                        <div style={{marginBottom: '10px', width: '220px'}}>
                            <ControlledCustomInput name={'sum'}
                                                   placeholder={'Сумма выплаты'}
                                                   control={formControl}
                            />
                        </div>
                        <Button type={'submit'}
                                buttonDivWrapper={s.calcButton}
                                onClick={() => {
                                }}
                        >
                            Сформировать выплату
                        </Button>
                    </div>

                </div>
            </form>
        )
    }
}