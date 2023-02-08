import React from 'react';
import {Box, Button, Modal, TextField} from "@mui/material";
import {useCreateTagModal} from "../index";

const CreateTagModal = () => {
    const open = useCreateTagModal(s => s.createTagModal)
    const setOpen = useCreateTagModal(s => s.setCreateTagModal)

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
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField id="outlined-basic" label="Назва группи" variant="outlined" value={'groupName'}
                           onChange={() => {
                           }}/>


                <Button>Створити группу</Button>
            </Box>
        </Modal>
    );
};

export default CreateTagModal;