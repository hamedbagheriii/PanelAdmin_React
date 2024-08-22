import React from 'react';
import SpinnerLoad from '../../UI/All/SpinnerLoad';

const SubmitBTN = ({formik , setEditId}) => {
    const handleSetEditId = (time)=>{
        setTimeout(() => {
            setEditId(null);
        }, time);
    }
    
    return (
        <div className="modal-footer w-100 d-flex justify-content-around" >
            <button type="button" className="btn btn-danger modal-btn w-25"
            onClick={()=>handleSetEditId(200)} data-bs-dismiss="modal">انصراف</button>
            <button type='submit' className="btn btn-primary modal-btn w-25"
            disabled={formik.isSubmitting || !(formik.dirty || formik.isValid)}>
                {formik.isSubmitting ?
                    <SpinnerLoad colorClass={'text-white'} inline={true} isSmall />
                : 'ذخیره'}
            </button>
        </div>
    );
}

export default SubmitBTN;
