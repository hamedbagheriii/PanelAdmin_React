import React from 'react';
import { useNavigate } from 'react-router-dom';

const Actions = ({rowData , handleDeleteDiscount}) => {
    const navigate = useNavigate();

    return (
        <>  
            <td>
                <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                 title="ویرایش کد" data-bs-placement="top" 
                 onClick={()=>navigate('/Discounts/add-discount-code' , {state : {discountData : rowData}})}></i>
                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                 title="حذف کد" data-bs-toggle="tooltip" data-bs-placement="top"
                 onClick={()=>handleDeleteDiscount(rowData)}></i>
            </td>
        </>
    );
}

export default Actions;
