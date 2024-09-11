import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryContext } from '../../../../context/categoryContext';
import ActionIcon from '../../../../UI/pages/actionIcon';

const Actions = ({rowData , handleDeleteCategory}) => {
    const navigate = useNavigate();
    const params = useParams();
    const {setEditId} = useContext(categoryContext);

    return (
        <div className='d-flex justify-content-center pt-1'>
            {!params.categoryID ? (
                <ActionIcon 
                action={()=>navigate(`/Category/${rowData.id}` , {state: {parentData : rowData}} )}
                icon={'fas fa-project-diagram text-info'}
                ptitle={''}
                title={'زیرمجموعه'}
                />
            ) : (
                null
            )}
            <ActionIcon 
            action={()=>setEditId(rowData.id)}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_category'}
            title={'ویرایش دسته'}
            target='add_product_category_modal'
            toggle='modal'
            />
            {params.categoryID ? (
                <ActionIcon 
                action={()=>navigate(`/Category/${rowData.id}/attributes` , {state: {categoryData : rowData}} )}
                icon={'fas fa-receipt text-success '}
                ptitle={'read_category_attrs'}
                title="افزودن ویژگی"
                />
            ) : null}
                <ActionIcon 
                action={()=>handleDeleteCategory(rowData)}
                icon={'fas fa-times text-danger'}
                ptitle={'delete_category'}
                title="حذف دسته"
                />
        </div>
    );
}

export default Actions;