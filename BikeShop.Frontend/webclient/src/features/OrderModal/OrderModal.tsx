import React, {useState} from 'react';
import {CustomModal} from "../../shared/ui";

const OrderModal = () => {
    const [o, so] = useState(false)
    return (
        <CustomModal
            open={o}
            onClose={() => {
                so(false)
            }}
        ></CustomModal>
    );
};

export default OrderModal;