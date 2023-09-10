import React from 'react';
import {CustomModal, UniTable} from "../../shared/ui";
import {UniTableColumn} from "../../entities";

interface p {
    open: boolean
    setOpen: (v: boolean) => void
    rows: any[]
    columns: UniTableColumn[]
}

const WatchArchiveDataModal = (p: p) => {
    return (
        <CustomModal
            open={p.open}
            onClose={() => {
                p.setOpen(false)
            }}
        >
            <div style={{height: "800px", width: "800px"}}>
                <UniTable rows={p.rows} columns={p.columns}/>
            </div>
        </CustomModal>
    );
};

export default WatchArchiveDataModal;