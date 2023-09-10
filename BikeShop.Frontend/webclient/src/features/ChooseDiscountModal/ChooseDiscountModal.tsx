import React, {useEffect, useState} from 'react'
import s from './ChooseDiscountModal.module.scss'
import {Button, CustomModal, LoaderScreen} from '../../shared/ui'
import Select from "react-select"
import useChooseDiscountModal from "./ChooseDiscountModalStore";
import {Discount} from "../../entities/DataTransferObjects/Discount";

interface p {
    open: boolean
    setOpen: (n: boolean) => void

    target: string
    onChange: (d: Discount) => void

}

export const ChooseDiscountModal = (p: p) => {

    const isLoading = useChooseDiscountModal(s => s.isLoading)
    const discountList = useChooseDiscountModal(s => s.discountsList)
    const getDiscountsByTarget = useChooseDiscountModal(s => s.getDiscountsByTarget)

    useEffect(() => {
        if (p.open) {
            setSelectedDiscount(null)
            getDiscountsByTarget(p.target)
        }
    }, [p.open])

    const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null)

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
            {isLoading ? <LoaderScreen variant={'ellipsis'}/> :
                <div className={s.discountModal_mainBox}>
                    <div className={s.discountModal_selectBlock}>
                        <Select
                            className={s.select_box}
                            options={discountList}
                            placeholder={'Скидка'}
                            isSearchable={false}
                            value={selectedDiscount}
                            getOptionLabel={label => label!.name}
                            onChange={(value: any) => {
                                setSelectedDiscount(value)
                            }}
                        />


                    </div>

                    <div className={s.discountModal_buttonsBlock}>
                        <Button onClick={() => {
                            p.onChange(selectedDiscount!)
                        }} disabled={selectedDiscount === null}>Применить</Button>
                    </div>
                </div>
            }
        </CustomModal>
    );
};