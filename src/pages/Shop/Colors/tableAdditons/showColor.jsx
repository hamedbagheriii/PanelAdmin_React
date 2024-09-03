import React from 'react';

const ShowColor = ({rowData}) => {
    return (
        <>
            <div className="w-100 h-100 d-block " 
            style={{background: rowData.code ,color: rowData.code}}>...</div>
        </>   
    )
}

export default ShowColor;
