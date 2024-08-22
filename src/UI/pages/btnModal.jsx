import React from 'react';

const BtnModal = ({id , setEditId=null}) => {
    return (
        <button className="btn btn-primary d-flex justify-content-center align-items-center" 
        data-bs-toggle="modal" data-bs-target={'#'+id} onClick={()=>setEditId ? setEditId(null) : null}>
                <i className="fas fa-plus text-light"></i>
        </button>
    );
}

export default BtnModal;
