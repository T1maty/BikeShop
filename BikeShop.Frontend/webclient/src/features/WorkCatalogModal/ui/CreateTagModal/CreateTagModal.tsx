import React from 'react';
import {Typography} from "@mui/material";
import useCreateTagModal from "../../model/CreateTagModalStore";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICreateTag} from "../../../../entities";
import {Button, ControlledInput} from "../../../../shared/ui";
// import {Modal} from "../../../../shared/ui/Modal/Modal";
import cls from './CreateTagModal.module.scss'
import {useWorkCatalog} from "../../../../widgets/workspace/TableCatalog/model/store/TableCatalogStore";
import {Modal} from "../../../../shared/ui/Modal/Modal";

interface Props {
    onSuccess?: (tag: ICreateTag) => void
}

export const CreateTagModal = (props: Props) => {
    const {onSuccess} = props
    const {getGroup} = useWorkCatalog(state => state)
    const open = useCreateTagModal(s => s.open)
    const setClose = useCreateTagModal(s => s.setClose)
    const parentNode = useCreateTagModal(s => s.parentNode)
    const createTag = useCreateTagModal(s => s.createTag)
    const variant = useCreateTagModal(s => s.variant)
    const {register ,handleSubmit, reset} = useForm({
        defaultValues: {
            name: "",
            parentId: 0,
            shopId: 1,
            isCollapsed: true,
        }
    });

    const onSubmit: SubmitHandler<any> = (data: any) => {
        createTag({...data, parentId: parentNode.parentId}).then((r: any) => {
            onSuccess ? onSuccess(r.data) : true
            setClose()
            reset()
            getGroup()
        })
    };

    return (
        <Modal
            open={open}
            onClose={() => setClose()}
            onContextMenu={(event) => event.preventDefault()}
        >
            <form onSubmit={handleSubmit(onSubmit)}
             className={cls.container}>
                <Typography sx={{pb: 3}}>Добавить
                    в: {variant}</Typography>

                <input {...register("name")}/>
                <Button color='primary' type="submit">Создать тег</Button>
            </form>
        </Modal>
    );
};
