import React from 'react';

const IsActive = ({rowData}) => {
    return (
        <span className={`fw-bold ${rowData.is_active == 1 ? 'text-success' : 'text-danger'}`} >
            {rowData.is_active == 1 ? 'فعال' : 'غیر فعال' }
        </span>
    );
}

export default IsActive;
