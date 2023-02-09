import React from 'react';
import {Box, Button, Modal, TextField} from "@mui/material";
import useChooseClientModal from './ChooseClientModalStore';

const ChooseClientModal = () => {
    const open = useChooseClientModal(s => s.chooseClientModal)
    const setOpen = useChooseClientModal(s => s.setChooseClientModal)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',

        boxShadow: 24,
        p: 4,
        borderRadius: 10,
    };

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField id="outlined-basic"
                           label="Назва группи"
                           variant="outlined"
                           value={'groupName'}
                           onChange={() => {}}
                />
                <Button>Выбрать клиента</Button>
                <Button>Отмена</Button>
            </Box>
        </Modal>
    );
};

export default ChooseClientModal;