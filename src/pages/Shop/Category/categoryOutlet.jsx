import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../../../components/PageContainer';
import PrevPageBTN from '../../../UI/All/PrevPageBTN';

const CategoryOutlet = () => {
    const location = useLocation();
    return (
        <>
            <div className='mb-4 w-100 d-flex justify-content-center' >
                <h6 className='d-flex fw-bold text-primary'>
                    زیرگروه
                    : 
                    <span className='text-white text-center pe-1'>
                        {location.state.parentData.title}
                    </span>
                </h6>
            </div>
            <PrevPageBTN />
        </>
    );
}

export default CategoryOutlet;
