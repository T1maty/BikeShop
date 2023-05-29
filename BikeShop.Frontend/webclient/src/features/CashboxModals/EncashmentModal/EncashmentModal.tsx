import React, {useEffect, useState} from 'react'
import s from './EncashmentModal.module.scss'
import {Button, ControlledCustomInput, CustomModal} from '../../../shared/ui'
import useEncashmentModal from "./EncashmentModalStore"
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {Encashment, EncashmentAPI, LocalStorage, useAuth, useCurrency} from "../../../entities";
import {CreateEncashment} from "../../../entities/requests/CreateEncashment";
import {useSnackbar} from "notistack";
import {PrintModal} from "../../PrintModal/PrintModal";
import {EncashmentPaper} from "../../../widgets/workspace/Invoices/Encashment/EncashmentPaper";

export const EncashmentModal = () => {

    const open = useEncashmentModal(s => s.openEncashmentModal)
    const setOpen = useEncashmentModal(s => s.setOpenEncashmentModal)
    const loginToShop = useAuth(s => s.loginToShop)
    const shop = useAuth(s => s.shop)
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)
    const {enqueueSnackbar} = useSnackbar()

    const [rest, setRest] = useState('0')
    const [print, setPrint] = useState(false)
    const [result, setResult] = useState<Encashment | null>(null)

    const formControl = useForm<CreateEncashment>({
        defaultValues: {
            cash: 0,
            description: '',
            shopId: LocalStorage.shopId()!,
            userId: LocalStorage.userId()!
        }
    })

    useEffect(() => {
        if (open === true) {
            loginToShop(shop?.id!)
        }
    }, [open])

    useEffect(() => {
        setRest(r(shop?.cashboxCash! * fbts.c - formControl.getValues('cash')))
    }, [formControl.watch('cash')])

    const onSubmit: SubmitHandler<CreateEncashment> = (data: CreateEncashment) => {
        console.log(data)
        let nd = {...data, cash: (data.cash * fstb.c)}
        EncashmentAPI.create(nd).then((r) => {
            enqueueSnackbar('Инкассация создана', {variant: 'success', autoHideDuration: 10000})
            loginToShop(shop?.id!)
            formControl.reset()
            setResult(r.data)
            setPrint(true)
        }).catch(() => {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 10000})
        })
    }

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <PrintModal open={print} setOpen={setPrint} children={<EncashmentPaper encashmant={result!}/>}
                        finaly={() => {
                            setOpen(false);
                            setPrint(false)
                        }}/>
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

                        <ControlledCustomInput name={'cash'}
                                               placeholder={'Изъято'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />

                        <div className={s.content_report}>
                            <div className={s.report}>
                                <Controller
                                    name={'description'}
                                    control={formControl.control}
                                    render={({field}: any) =>
                                        <textarea placeholder={'Дополнительная информация'}
                                                  value={field.value}
                                                  onChange={(v) => {
                                                      field.onChange(v)
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