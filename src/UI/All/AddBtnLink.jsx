import React from 'react';
import { Link } from 'react-router-dom';

const AddBtnLink = ({pach , bgColor='primary'}) => {
    return (
        <Link className={`btn btn-${bgColor} d-flex justify-content-center align-items-center`}
        to={pach} >
            <i className="fas fa-plus text-light"></i>
        </Link>
    );
}

export default AddBtnLink;
