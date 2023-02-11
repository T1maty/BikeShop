import React from 'react';
import {Box, Button, Checkbox, FormControlLabel, Modal, TextField} from "@mui/material";
import useCreateProductModal from "./createProductModalStore";

const CreateProductModal = () => {

    const open = useCreateProductModal(s => s.open)
    const setOpen = useCreateProductModal(s => s.setOpen)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#33373B',

        boxShadow: 24,
        p: 4,
        borderRadius: 10,
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <TextField sx={{pb: 3}} fullWidth={true} id="outlined-basic" label="Название товара"
                           variant="outlined"/>
                <TextField sx={{pb: 3}} fullWidth={true} id="outlined-basic" label="Каталожный номер"
                           variant="outlined"/>
                <TextField sx={{pb: 3}} fullWidth={true} id="outlined-basic" label="Штрихкод производителя"
                           variant="outlined"/>
                <TextField sx={{pb: 3}} fullWidth={true} id="outlined-basic" label="Цена возможной закупки"
                           variant="outlined"/>
                <TextField sx={{pb: 3}} fullWidth={true} id="outlined-basic" label="Оптовая цена" variant="outlined"/>
                <TextField sx={{pb: 3}} fullWidth={true} id="outlined-basic" label="Розничная цена" variant="outlined"/>
                <br/>
                <FormControlLabel sx={{pb: 3}} control={<Checkbox/>} label="Видим в интернет-магазине"/>
                <br/>
                <FormControlLabel sx={{pb: 3}} control={<Checkbox/>} label="Видим в B2B"/>
                <br/>
                <Button color={'primary'}>Создать товар</Button>
                <Button color={'primary'}>Отмена</Button>
            </Box>
        </Modal>
    );
};

export default CreateProductModal;