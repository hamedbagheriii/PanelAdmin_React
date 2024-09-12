import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../../UI/pages/actionIcon';

const Actions = ({rowData , handleDeleteCarts}) => {
    const navigate = useNavigate();

    return (
        <>  
            <ActionIcon 
            action={()=>navigate('/Carts/add-cart' , {state : {cartData : rowData}})}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_cart'}
            title={"ویرایش و جزئیات سبد"}
            />
            <ActionIcon 
            action={()=>handleDeleteCarts(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_cart'}
            title={"حذف سبد"}
            />
        </>
    );
}

export default Actions;
