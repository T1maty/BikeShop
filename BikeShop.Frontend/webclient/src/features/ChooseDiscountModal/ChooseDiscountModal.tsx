import React, {useState} from 'react'
import {Box, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent} from '@mui/material'
import {Button} from '../../shared/ui'
import s from './ChooseDiscountModal.module.scss'
import useChooseDiscountModal from './ChooseDiscountModalStore'

export const ChooseDiscountModal = () => {
    const open = useChooseDiscountModal(s => s.openDiscountModal)
    const setOpen = useChooseDiscountModal(s => s.setOpenDiscountModal)

    const [age, setAge] = useState<string>('')

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const chooseButtonHandler = () => {
        // code here
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.discountModal_mainBox}>
                <div className={s.discountModal_selectBlock}>
                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Скидка</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>10%</MenuItem>
                                <MenuItem value={20}>20%</MenuItem>
                                <MenuItem value={30}>30%</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                <div className={s.discountModal_buttonsBlock}>
                    <Button onClick={chooseButtonHandler}>
                        Выбрать скидку
                    </Button>
                    <Button onClick={() => {setOpen(false)}}>
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};