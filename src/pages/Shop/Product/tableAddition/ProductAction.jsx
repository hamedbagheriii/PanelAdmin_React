import React from 'react';

// ! ایدی وارد نشده !!!!!!!!!!!!!!!!

const ProductAction = ({rowData , handleDeleteProduct}) => {
    return (
        <>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
            title="ویرایش محصول" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#"
            ></i>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
            title="ویرایش محصول" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#"
            ></i>
            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
             title="حذف محصول" data-bs-toggle="tooltip" data-bs-placement="top"
             onClick={()=>handleDeleteProduct(rowData)}
            ></i>
        </>
    );
}

export default ProductAction;
