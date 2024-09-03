import React from 'react';
import { apiPath } from '../../../../services/httpService';

const BrandLogo = ({rowData}) => {
    return (
        <>
            {rowData.logo ?
                <img src={apiPath + '/' + rowData.logo} width="40" />
            : null}
        </>  
    );
}

export default BrandLogo;
