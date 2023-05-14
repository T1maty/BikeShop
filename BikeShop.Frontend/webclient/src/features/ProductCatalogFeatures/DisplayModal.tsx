import React, {useEffect} from 'react';
import {Button, CustomModal, CustomRadioButton} from "../../shared/ui";
import useProductCatalogTableStore
    from "../../widgets/workspace/ProductCatalog/ProductCatalogTable/ProductCatalogTableStore";

const DisplayModal = (props: { open: boolean, setOpen: (n: boolean) => void }) => {
    const setNotSortedToTable = useProductCatalogTableStore(s => s.setNotSortedToTable)
    const radioOptions = ['По кличеству товара на складе', 'По заполнению карточки', 'Сначала дешевые', 'Сначала дорогие']

    const sortMode = useProductCatalogTableStore(s => s.sortMode)
    const setSortMode = useProductCatalogTableStore(s => s.setSortMode)
    const sort = useProductCatalogTableStore(s => s.sort)

    useEffect(() => {
        sort()
    }, [sortMode])

    return (
        <CustomModal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
        >
            <div>
                <CustomRadioButton options={radioOptions}
                                   value={sortMode}
                                   onChangeOption={setSortMode}/>
                <br/>

                <Button onClick={() => {
                    props.setOpen(false)
                    setNotSortedToTable()
                }}>Показать неотсортированные</Button>
                <br/>
                <Button onClick={() => {
                    props.setOpen(false)
                }}>Показать незаполненные</Button>
            </div>
        </CustomModal>
    );
};

export default DisplayModal;