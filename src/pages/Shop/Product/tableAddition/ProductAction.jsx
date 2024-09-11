import React from 'react';
import ActionIcon from '../../../../UI/pages/actionIcon';


const ProductAction = ({rowData , handleDeleteProduct , navigate}) => {
    return (
        <>
            <ActionIcon 
            action={()=>navigate('/Product/Add-Product' , {state : {productToEdit : rowData}})}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_product'}
            title={"ویرایش محصول"}
            />
            <ActionIcon 
            action={()=>navigate(`/Product/${rowData.id}/attributes` , {state : {productData : rowData}})}
            icon={'fas fa-receipt text-info'}
            ptitle={'create_product_attr'}
            title={"ثبت ویژگی"}
            />
            <ActionIcon 
            action={()=>navigate(`/Product/${rowData.id}/gallery` , {state : {productData : rowData}})}
            icon={'fas fa-images text-success'}
            ptitle={'create_product_image'}
            title={"مدیریت گالری"}
            />
            <ActionIcon 
            action={()=>handleDeleteProduct(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_product'}
            title={"حذف محصول"}
            />
        </>
    );
}

export default ProductAction;
