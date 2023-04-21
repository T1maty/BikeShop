import React, {useEffect} from 'react'
import s from './EncashmentModal.module.scss'
import {Button, ControlledCustomInput, CustomModal} from '../../../shared/ui'
import useEncashmentModal from "./EncashmentModalStore"
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {Errors} from "../../../entities/errors/workspaceErrors"

export const EncashmentModal = () => {

    const open = useEncashmentModal(s => s.openEncashmentModal)
    const setOpen = useEncashmentModal(s => s.setOpenEncashmentModal)

    const formControl = useForm<any>({
        defaultValues: {
            sum: 0,
            details: '',
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        //
    }

    useEffect(() => {
        // formControl.reset()
        formControl.setValue('sum', 0)
        formControl.setValue('details', '')
    }, [])

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <div className={s.encashmentModal_mainBox}>
                    <div className={s.encashment_header}>
                        <div className={s.title}>
                            Инкассация
                        </div>
                        <div className={s.date}>
                            {Date.now()}
                        </div>
                    </div>
                    <div className={s.encashment_content}>
                        <div>
                            <div className={s.title}>
                                Доступно:
                            </div>
                            <div className={s.info}>
                                9991299
                            </div>
                        </div>

                        <ControlledCustomInput name={'sum'}
                                               placeholder={'Изъято'}
                                               control={formControl}
                                               // rules={{required: Errors[0].name}}
                        />

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

                        <div>
                            <div className={s.title}>
                                Остаток:
                            </div>
                            <div className={s.info}>
                                99999
                            </div>
                        </div>
                        <div>
                            <div className={s.title}>
                                Безнал.:
                            </div>
                            <div className={s.info}>
                                1212132
                            </div>
                        </div>
                    </div>
                    <div className={s.encashment_buttons}>
                        <Button>
                            Отмена
                        </Button>
                        <Button type={'submit'}>
                            Создать
                        </Button>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}