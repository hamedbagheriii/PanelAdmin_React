import React from 'react';
import ActionIcon from '../../../../UI/pages/actionIcon';

const AtrrAction = ({rowData , attrToEdit , setAttrToEdit , handleDeleteCategoryAttr}) => {
    
    return (
        <div className={`d-flex justify-content-center`}>
            {!(attrToEdit == rowData.id )? (
                <>
                    <ActionIcon 
                    action={setAttrToEdit(rowData.id)}
                    icon={'fas fa-edit text-warning'}
                    ptitle={'update_category_attr'}
                    title={"ویرایش دسته"}
                    />
                    <ActionIcon 
                    action={handleDeleteCategoryAttr(rowData)}
                    icon={'fas fa-times text-danger'}
                    ptitle={'delete_category_attr'}
                    title={"حذف دسته"}
                    />
                </>
            ) : (
                <span className='fw-bold text-danger bg-warning px-2 rounded-2 py-1'>انتخاب شده !</span>
            )}
        </div>  
    );
}

export default AtrrAction;
