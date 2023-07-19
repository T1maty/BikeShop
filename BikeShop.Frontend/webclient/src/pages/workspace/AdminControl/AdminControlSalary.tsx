import React, {useEffect, useState} from 'react'
import s from './AdminControlSalary.module.scss'
import {Button, ControlledCustomInput, LoaderScreen} from '../../../shared/ui'
import {SubmitHandler, useForm} from 'react-hook-form'
import useAdminControl from './AdminControlStore'
import {useSnackbar} from 'notistack'
import {selectColorStylesWhite} from '../../../app/styles/variables/selectColorStylesWhite'
import Select from 'react-select'
import {useCurrency} from "../../../entities";
import useStuffProfile from "../StuffProfile/StuffProfileStore";
import {formatDate} from "../../../shared/utils/formatDate";

export const AdminControlSalary = () => {

    const {enqueueSnackbar} = useSnackbar()

    const isLoading = useAdminControl(s => s.isLoading)
    const errorStatus = useAdminControl(s => s.errorStatus)
    const selectedEmployee = useAdminControl(s => s.selectedEmployee)
    const setSelectedEmployee = useAdminControl(s => s.setSelectedEmployee)
    const employers = useAdminControl(s => s.employers)
    const getEmployersList = useAdminControl(s => s.getEmployersList)
    const calculateData = useStuffProfile(s => s.calculateData);
    const calc = useStuffProfile(s => s.calculate);

    const [sum, setSum] = useState(0)
    useEffect(() => {
        if (calculateData != null) {
            let sum = 0
            sum += calculateData.serviceWorks
            sum += calculateData.seviceProducts
            sum += calculateData.billsTotal
            sum += calculateData.rate
            setSum(sum)
        }
    }, [calculateData])
    const r = useCurrency(s => s.roundUp)
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const load = useStuffProfile(s => s.calculate);

    const formControl = useForm<any>({
        defaultValues: {
            userId: '',
            start: 0,
            end: 0,
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
        // formControl.setValue('start', currentEmployeeSalary ? currentEmployeeSalary.start : 0)
        // formControl.setValue('end', currentEmployeeSalary ? currentEmployeeSalary.end : 0)
        // formControl.setValue('sum', currentEmployeeSalary ? currentEmployeeSalary.sum : 0)
    }, [])

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
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <div className={s.stuffProfileWork_mainBlock}>

                    <div className={s.stuffProfileWork_title}>
                        <div className={s.title_selectBlock}>
                            <div style={{color: 'black', width: '50%'}}>
                                <Select
                                    className={s.options_search}
                                    placeholder={'Выбрать сотрудника'}
                                    isSearchable={false}
                                    options={employers}
                                    value={selectedEmployee}
                                    onChange={(v) => {
                                        setSelectedEmployee(v!.user.id)
                                    }}
                                    getOptionLabel={label => label.user.lastName}
                                    getOptionValue={value => value.user.lastName}
                                    styles={selectColorStylesWhite}
                                />
                            </div>
                            <div>Прошлая выплата: 20.01.2022, 14:00</div>
                        </div>
                        <div className={s.title_calcBlock}>
                            <div>
                                <div>Начало:</div>
                                <ControlledCustomInput name={'start'}
                                                       placeholder={'Начало периода'}
                                                       control={formControl}
                                                       divClassName={s.startTime}
                                />
                            </div>
                            <div>
                                <div>Конец:</div>
                                <ControlledCustomInput name={'end'}
                                                       placeholder={'Конец периода'}
                                                       control={formControl}
                                                       divClassName={s.endTime}
                                />
                            </div>
                            <Button buttonDivWrapper={s.calcButton}
                                    onClick={() => {
                                    }}
                            >
                                Рассчитать
                            </Button>
                        </div>
                    </div>
                    <div className={s.stuffProfileWork_hours}>
                        {/*<div>Смен: 20</div>*/}
                        <div>Часов: {calculateData?.hours}</div>
                        <div>Начало: {formatDate(calculateData?.periodStart ? calculateData?.periodStart : "")}</div>
                        <div>Конец: {formatDate(calculateData?.periodFinish ? calculateData?.periodFinish : "")}</div>
                        <br/>
                        <div>Чеки: {calculateData?.bills}</div>
                        <div>Услуги сервисов шт.: {calculateData?.serviceWorks}</div>
                        <div>Товары сервисов шт.: {calculateData?.seviceProducts}</div>
                    </div>

                    <div className={s.stuffProfileWork_salary}>
                        <fieldset>
                            <legend>Зарплата на текущий момент</legend>
                            <div className={s.salary_info}>
                                <div className={s.salary_info1}>
                                    <div>Ремонты: {r(calculateData ? calculateData.workTotal * fbts.c : 0) + fbts.s}</div>
                                    <div>Продажи
                                        ремонтов: {r(calculateData ? calculateData.productsTotal * fbts.c : 0) + fbts.s}</div>
                                    <div>Продажи: {r(calculateData ? calculateData.billsTotal * fbts.c : 0) + fbts.s}</div>
                                    <div>Ставка: {r(calculateData ? calculateData.rate * fbts.c : 0) + fbts.s}</div>
                                </div>
                                <div className={s.salary_info2}>
                                    <div>Бонусы: 0</div>
                                    <div>Штрафы: 0</div>
                                </div>
                                <div className={s.salary_result}>Итого: {r(sum * fbts.c) + fbts.s}</div>
                            </div>
                            <Button buttonDivWrapper={s.calcButton}
                                    onClick={() => {
                                        calc(selectedEmployee!.user.id);
                                    }}
                            >
                                Рассчитать
                            </Button>
                        </fieldset>
                    </div>

                    <div className={s.controlBlock}>
                        <div className={s.controlBlock_sum}>
                            <div style={{marginBottom: '10px'}}>
                                Сумма выплаты:
                            </div>
                            <ControlledCustomInput name={'sum'}
                                                   placeholder={'Сумма выплаты'}
                                                   control={formControl}
                                                   divClassName={s.sum_input}
                            />
                        </div>
                        <Button type={'submit'}
                                buttonDivWrapper={s.giveMoneyButton}
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