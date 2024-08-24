import React from 'react';
import { apiPath } from '../../../../services/httpService';

const BrandLogo = ({rowData}) => {
    return (
        <>
            <td>
                {rowData.logo ?
                    <img src={apiPath + '/' + rowData.logo} width="40" />
                : null}
            </td>  
        </>
    );
}

export default BrandLogo;
