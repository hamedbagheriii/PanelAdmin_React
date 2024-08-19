import React from 'react';

const PersonalError = ({children , className}) => {
    return (
        <span className={`w-100 text-white bg-dark p-1 px-2 rounded-3 ${className}`} style={{fontSize:13}}>
            <i className="fas fa-exclamation-triangle ps-2 text-danger"></i>
            {children}
        </span>
    );
}

export default PersonalError;