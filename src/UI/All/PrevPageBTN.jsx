import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrevPageBTN = () => {
    const navigate= useNavigate();
    return (
        <div className='bg-dark d-flex alignitems-center justify-content-center
        prevPageBTN'>
            <button className="btn btn-danger" onClick={()=>navigate(-1)}>
                بازگشت
            </button>
        </div>
    );
}

export default PrevPageBTN;
