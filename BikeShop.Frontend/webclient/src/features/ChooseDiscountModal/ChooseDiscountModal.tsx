import React, {useState} from 'react'
import s from './ChooseDiscountModal.module.scss'
import {Modal} from '@mui/material'
import {Button, ControlledReactSelect} from '../../shared/ui'
import useChooseDiscountModal from './ChooseDiscountModalStore'
import {SubmitHandler, useForm} from "react-hook-form"
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
    //     // выбор скидки
    //     //     addNewService(data).then((res: any) => {
    //     //         setOpen(false)
    //     //         enqueueSnackbar('Скидка выбрана', {variant: 'success', autoHideDuration: 3000})
    //     //     }).catch((error: any) => {
    //     //         let message = error(error.response.data.errorDescription).toString()
    //     //         formControl.setError('name', {type: 'serverError', message: message})
    //     //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
    //     //         console.error(error.response.data)
    //     //     })
    // }

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.discountModal_mainBox}>
                <div className={s.discountModal_selectBlock}>
                    <Select
                        className={s.select_box}
                        options={discountList}
                        placeholder={'Скидка'}
                        isSearchable={false}
                        value={selectedDiscount}
                        onChange={(value: any) => {setSelectedDiscount(value)}}
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
                    <Button onClick={() => {}}>Выбрать скидку</Button>
                    <Button onClick={() => {setOpen(false)}}>Отмена</Button>
                </div>
            </div>
        </Modal>
    );
};