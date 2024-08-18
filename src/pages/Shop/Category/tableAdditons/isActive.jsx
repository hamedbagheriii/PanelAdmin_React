import React from 'react';

const IsActive = ({rowData}) => {
    return (
        <>
            <td className={`fw-bold ${rowData.is_active == 1 ? 'text-success' : 'text-danger'}`} >
                {rowData.is_active == 1 ? 'فعال' : 'غیر فعال' }
            </td>
        </>
    );
}

export default IsActive;
