import React, {useEffect} from 'react'
import s from './StorageProductsTransferArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from "../../../shared/ui"
import {useSnackbar} from "notistack"
import useStorageProductsTransferArchiveModalStore from './StorageProductsTransferArchiveModalStore'
import {StorageProductsList} from './StorageProductsList'

export const StorageProductsTransferArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useStorageProductsTransferArchiveModalStore(s => s.openStorageProductsTransferArchiveModal)
    const setOpen = useStorageProductsTransferArchiveModalStore(s => s.setOpenStorageProductsTransferArchiveModal)
    const isLoading = useStorageProductsTransferArchiveModalStore(s => s.isLoading)
    const errorStatus = useStorageProductsTransferArchiveModalStore(s => s.errorStatus)
    const archive = useStorageProductsTransferArchiveModalStore(s => s.archive)
    const getTransferProducts = useStorageProductsTransferArchiveModalStore(s => s.getTransferProducts)

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        open ? getTransferProducts() : false
        console.log(archive)
    }, [open])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <div className={s.serviceFinalArchiveModal_mainBlock}>
                    <div className={s.serviceFinalArchiveModal_title}>
                        Архив перемещений товара со склада
                    </div>

                    <div className={s.archive_wrapper}>
                        <div>
                            <fieldset className={s.result_fieldset}>
                                <legend>Созданные</legend>
                                <div className={s.serviceFinalArchiveModal_list}>
                                    <StorageProductsList archive={archive}/>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <fieldset className={s.result_fieldset}>
                                <legend>В пути</legend>
                                <div className={s.serviceFinalArchiveModal_list}>
                                    <StorageProductsList archive={archive}/>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <fieldset className={s.result_fieldset}>
                                <legend>Завершенные</legend>
                                <div className={s.serviceFinalArchiveModal_list}>
                                    <StorageProductsList archive={archive}/>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </CustomModal>
        )
    }
}