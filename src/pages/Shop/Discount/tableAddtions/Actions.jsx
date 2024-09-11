import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../../UI/pages/actionIcon';

const Actions = ({rowData , handleDeleteDiscount}) => {
    const navigate = useNavigate();

    return (
        <>  
            <ActionIcon 
            action={navigate('/Discounts/add-discount-code' , {state : {discountData : rowData}})}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_discount'}
            title={"ویرایش کد"}
            />
            <ActionIcon 
            action={handleDeleteDiscount(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_discount'}
            title={"حذف کد"}
            />
        </>
    );
}

export default Actions;
