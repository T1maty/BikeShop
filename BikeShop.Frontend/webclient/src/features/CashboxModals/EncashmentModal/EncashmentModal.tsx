import React, {useEffect, useState} from 'react'
import s from './EncashmentModal.module.scss'
import {Button, ControlledCustomInput, CustomModal} from '../../../shared/ui'
import useEncashmentModal from "./EncashmentModalStore"
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {useAuth, useCurrency} from "../../../entities";

export const EncashmentModal = () => {

    const open = useEncashmentModal(s => s.openEncashmentModal)
    const setOpen = useEncashmentModal(s => s.setOpenEncashmentModal)
    const loginToShop = useAuth(s => s.loginToShop)
    const shop = useAuth(s => s.shop)
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const [rest, setRest] = useState('0')

    const formControl = useForm<any>({
        defaultValues: {
            sum: 0,
            details: '',
        }
    })

    useEffect(() => {
        if (open === true) {
            loginToShop(shop?.id!)
        }
    }, [open])

    useEffect(() => {
        setRest(r(shop?.cashboxCash! * fbts.c - formControl.getValues('sum')))
    }, [formControl.watch('sum')])

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
            onClose={() => {
                setOpen(false)
            }}
        >
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <div className={s.encashmentModal_mainBox}>
                    <div className={s.encashment_header}>
                        <div className={s.title}>
                            Инкассация
                        </div>
                        <div className={s.date}>
                            {new Date().toLocaleString('en-GB')}
                        </div>
                    </div>
                    <div className={s.encashment_content}>
                        <div>
                            <div className={s.title}>
                                Доступно:
                            </div>
                            <div className={s.info}>
                                {shop?.cashboxCash ? r(shop?.cashboxCash * fbts.c) + fbts.s : 'Ошибка'}
                            </div>
                        </div>

                        <ControlledCustomInput name={'sum'}
                                               placeholder={'Изъято'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />

                        <div className={s.content_report}>
                            <div className={s.report}>
                                <Controller
                                    name={'details'}
                                    control={formControl.control}
                                    render={({field}: any) =>
                                        <textarea placeholder={'Дополнительная информация'}
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
                                {rest + fbts.s}
                            </div>
                        </div>
                        <div>
                            <div className={s.title}>
                                Безнал.:
                            </div>
                            <div className={s.info}>
                                {shop?.cashboxCash ? r(shop?.cashboxTerminal * fbts.c) + fbts.s : 'Ошибка'}
                            </div>
                        </div>
                    </div>
                    <div className={s.encashment_buttons}>
                        <Button>
                            Отмена
                        </Button>
                        <Button type={'submit'} disabled={rest === "NaN"}>
                            Создать
                        </Button>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}