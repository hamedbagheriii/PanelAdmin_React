import React from 'react';

const DashboardTr = ({count , categoryTitle , title , status , icon}) => {
    return (
        <tr>
            <td>{count}</td>
            <td>{categoryTitle}</td>
            <td>{title}</td>
            <td>{status}</td>
            <td>
                <i className={`${icon} text-danger mx-1 hoverable_text pointer has_tooltip`} ></i>
            </td>
        </tr>
    );
}

export default DashboardTr;
