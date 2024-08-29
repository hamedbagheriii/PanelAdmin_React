import React from 'react';

const ShowColor = ({rowData}) => {
    return (
        <>
            <td className="p-2">
                <div className="w-100 h-100 d-block " 
                style={{background: rowData.code ,color: rowData.code}}>...</div>
            </td>   
        </>
    );
}

export default ShowColor;
