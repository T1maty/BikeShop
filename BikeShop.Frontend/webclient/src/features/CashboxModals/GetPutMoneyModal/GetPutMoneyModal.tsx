import React, {useEffect, useState} from 'react'
import s from './GetPutMoneyModal.module.scss'
import {Button, ControlledCustomInput, CustomModal, CustomRadioButton} from '../../../shared/ui'
import useGetPutMoneyModal from "./GetPutMoneyModalStore"
import {SubmitHandler, useForm, Controller} from "react-hook-form"

export const GetPutMoneyModal = () => {

    const radioGetPut = ['Выдача', 'Внесение']

    const open = useGetPutMoneyModal(s => s.openGetPutMoneyModal)
    const setOpen = useGetPutMoneyModal(s => s.setOpenGetPutMoneyModal)

    const formControl = useForm<any>({
        defaultValues: {
            details: '',
            sum: 0,
            radioGetPut: 'Выдача',
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        //
    }

    useEffect(() => {
        // formControl.reset()
        formControl.setValue('details', '')
        formControl.setValue('sum', 0)
        formControl.setValue('radioGetPut', 'Выдача')
    }, [])

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
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
                                    name={'details'}
                                    control={formControl.control}
                                    render={({field}: any) =>
                                        <textarea placeholder={'Детальное описание'}
                                                  value={field.value.details}
                                                  onChange={(v) => {
                                                      field.onChange({
                                                          ...field.value,
                                                          details: v.target.value
                                                      })
                                                  }}
                                        />
                                    }
                                />
                            </div>
                        </div>

                        <div className={s.content_info}>
                            <div className={s.infoBlock}>
                                <ControlledCustomInput name={'sum'}
                                                       placeholder={'Сумма'}
                                                       divClassName={s.sumInput}
                                                       control={formControl}
                                                       // rules={{required: Errors[0].name}}
                                />
                                <div className={s.infoBlock_radioButtons}>
                                    <Controller
                                        name={'radioGetPut'}
                                        control={formControl.control}
                                        render={({field}: any) =>
                                            <CustomRadioButton
                                                name={'radioGetPut'}
                                                options={radioGetPut}
                                                value={field.value.radioGetPut}
                                                onChangeOption={(v) => {
                                                    field.onChange({
                                                        ...field.value,
                                                        radioGetPut: v.target.value
                                                    })
                                                }}
                                            />
                                        }
                                    />
                                </div>
                            </div>
                            <div className={s.buttonsBlock}>
                                <Button>
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