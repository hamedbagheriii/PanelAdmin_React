import React from 'react';

const SpinnerLoad = ({colorClass=null , isSmall=false , inline=false}) => {
    return (
        <span className={`text-center mb-2 ${!inline ? 'd-block' : 'mx-2'} ${colorClass}`}>
            <div className={`spinner-border ${isSmall ? 'spinner-border-sm' : null}`}></div>
        </span>
    );
}

export default SpinnerLoad;
