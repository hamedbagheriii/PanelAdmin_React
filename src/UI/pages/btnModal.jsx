import React from 'react';

const BtnModal = ({id}) => {
    return (
        <button className="btn btn-primary d-flex justify-content-center align-items-center" 
        data-bs-toggle="modal" data-bs-target={'#'+id}>
                <i className="fas fa-plus text-light"></i>
        </button>
    );
}

export default BtnModal;
