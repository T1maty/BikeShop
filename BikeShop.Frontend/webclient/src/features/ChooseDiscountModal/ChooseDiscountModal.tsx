import React, {useState} from 'react'
import s from './ChooseDiscountModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import useChooseDiscountModal from './ChooseDiscountModalStore'
import Select from "react-select"

export const ChooseDiscountModal = () => {

    const open = useChooseDiscountModal(s => s.openDiscountModal)
    const setOpen = useChooseDiscountModal(s => s.setOpenDiscountModal)

    const discountList = [
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 30, label: '30'},
    ]

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
            open={open}
            onClose={() => {
                setOpen(false)
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
                        setOpen(false)
                    }}>Отмена</Button>
                </div>
            </div>
        </CustomModal>
    );
};