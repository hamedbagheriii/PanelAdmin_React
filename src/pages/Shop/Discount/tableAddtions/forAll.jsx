import React from 'react';

const ForAll = ({rowData}) => {
    return (
        <span className={`fw-bold ${rowData.for_all ? 'text-success' : 'text-danger'}`} >
            {rowData.for_all ? 'همه' : 'تعدادی از محصولات' }
        </span>
    );
}
export default ForAll;
