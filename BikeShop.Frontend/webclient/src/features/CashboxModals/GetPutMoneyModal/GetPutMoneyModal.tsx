import React, {useEffect, useState} from 'react'
import s from './GetPutMoneyModal.module.scss'
import {Button, ControlledCustomInput, CustomModal, CustomRadioButton, LoaderScreen} from '../../../shared/ui'
import useGetPutMoneyModal from "./GetPutMoneyModalStore"
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import {CashboxActionRequest, useCurrency} from "../../../entities"
import {useSnackbar} from "notistack"

type RadioGetPutTypes = 'Выдача' | 'Внесение'

export const GetPutMoneyModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const radioGetPutOptions = ['Выдача', 'Внесение']
    const [radioGetPut, setRadioGetPut] = useState<RadioGetPutTypes>('Выдача')

    const open = useGetPutMoneyModal(s => s.openGetPutMoneyModal)
    const setOpen = useGetPutMoneyModal(s => s.setOpenGetPutMoneyModal)
    const isLoading = useGetPutMoneyModal(s => s.isLoading)
    const errorStatus = useGetPutMoneyModal(s => s.errorStatus)
    const createCashbox = useGetPutMoneyModal(s => s.createCashbox)

    const fstb = useCurrency(s => s.fromSelectedToBase)

    const formControl = useForm<CashboxActionRequest>({
        defaultValues: {
            description: '',
            cash: 0,
        }
    })

    const onSubmit: SubmitHandler<CashboxActionRequest> = (data: CashboxActionRequest) => {
        if (radioGetPut === 'Выдача') {
            data.cash *= -1 * fstb.c
        } else {
            data.cash *= fstb.c
        }

        data.shopId = 1
        data.userId = 'c04b07d5-441b-4630-87b0-97b889855556'
        console.log(data)
        createCashbox(data)
        formControl.reset()
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('description', '')
        formControl.setValue('cash', 0)
    }, [])

    useEffect(() => {
        if (errorStatus === 'success') {
            enqueueSnackbar('Операция выполнена', {variant: 'success', autoHideDuration: 3000})
        }
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

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
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div className={s.getPutMoneyModal_mainBox}>

                        <div className={s.getPutMoneyModal_title}>
                            Акт внесения и выдачи денег
                        </div>

                        <div className={s.getPutMoneyModal_content}>
                            <div className={s.content_report}>
                                <div className={s.report}>
                                    <Controller
                                        name={'description'}
                                        control={formControl.control}
                                        render={({field}: any) =>
                                            <textarea {...field}
                                                      placeholder={'Детальное описание'}
                                            />
                                        }
                                    />
                                </div>
                            </div>

                            <div className={s.content_info}>
                                <div className={s.infoBlock}>
                                    <ControlledCustomInput name={'cash'}
                                                           placeholder={'Сумма'}
                                                           divClassName={s.sumInput}
                                                           control={formControl}
                                        // rules={{required: Errors[0].name}}
                                    />
                                    <div>{fstb.s}</div>
                                    <div className={s.infoBlock_radioButtons}>
                                        <CustomRadioButton
                                            options={radioGetPutOptions}
                                            value={radioGetPut}
                                            onChangeOption={setRadioGetPut}
                                        />
                                    </div>
                                </div>
                                <div className={s.buttonsBlock}>
                                    <Button onClick={() => {
                                        setOpen(false)
                                    }}>
                                        Отмена
                                    </Button>
                                    <Button type={'submit'}>
                                        Создать
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </CustomModal>
        )
    }
}