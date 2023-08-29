import React, {useEffect, useState} from 'react'
import s from './ChooseDiscountModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import Select from "react-select"
import {DiscountTargetEnum} from "../../entities/enumerables/DiscountTargetEnum";

interface p {
    open: boolean
    setOpen: (n: boolean) => void

    target: DiscountTargetEnum
}

export const ChooseDiscountModal = (p: p) => {

    const discountList = [
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 30, label: '30'},
    ]

    useEffect(() => {
        if (p.open) {

        }
    }, [p.open])

    const [selectedDiscount, setSelectedDiscount] = useState(null)

    // const formControl = useForm<any>({
    //     defaultValues: {
    //         discount: '',
    //     }
    // })
    //
    // const onSubmit: SubmitHandler<any> = (data: any) => {
    //
    // }

    return (
        <CustomModal
            open={p.open}
            onClose={() => {
                p.setOpen(false)
            }}
        >
            <div className={s.discountModal_mainBox}>
                <div className={s.discountModal_selectBlock}>
                    <Select
                        className={s.select_box}
                        options={discountList}
                        placeholder={'Скидка'}
                        isSearchable={false}
                        value={selectedDiscount}
                        onChange={(value: any) => {
                            setSelectedDiscount(value)
                        }}
                    />

                    {/*<ControlledReactSelect control={formControl}*/}
                    {/*                       name={'discount'}*/}
                    {/*                       className={s.select_box}*/}
                    {/*                       placeholder={'Скидка'}*/}
                    {/*                       // isSearchable*/}
                    {/*                       value={selectedDiscount}*/}
                    {/*                       onChangeSelect={(value: any) => {setSelectedDiscount(value)}}*/}
                    {/*                       data={discountList.map((el: any) => {*/}
                    {/*                           return {*/}
                    {/*                               // id: el.id,*/}
                    {/*                               value: el.value,*/}
                    {/*                               label: el.label,*/}
                    {/*                           }*/}
                    {/*                       })}*/}
                    {/*/>*/}
                </div>

                <div className={s.discountModal_buttonsBlock}>
                    <Button onClick={() => {
                    }}>Выбрать скидку</Button>
                    <Button onClick={() => {
                        p.setOpen(false)
                    }}>Отмена</Button>
                </div>
            </div>
        </CustomModal>
    );
};