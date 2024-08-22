import React from 'react';

const ShowInFilter = ({rowData}) => {
    return (
        <>
            <td className={`${rowData.in_filter ? 'text-success' : 'text-danger'}`}>
                {rowData.in_filter ? 'فعال' : 'غیر فعال'}
            </td>  
        </>
    );
}

export default ShowInFilter;
