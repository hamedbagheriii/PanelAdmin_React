import React from 'react';
import SpinnerLoad from '../../UI/All/SpinnerLoad';
import { useNavigate } from 'react-router-dom';

const SubmitBTN = ({formik , setEditId=null , closeModal=false , isValid=true , isModal=true}) => {
    const navigate = useNavigate();
    const handleSetEditId = (time)=>{
        formik.resetForm();
        if (setEditId) {
            setTimeout(() => {
                setEditId(null);
            }, time);
        }
    }
    
    return (
        <div className={`w-100 d-flex justify-content-around  ${isModal ? 'modal-footer' : null}`} style={{zIndex:2000}}>
            <button type="button" className="btn btn-danger modal-btn w-25"
            onClick={()=>(setEditId ? handleSetEditId(200) : navigate(-1))} data-bs-dismiss="modal">انصراف</button>
            <button type='submit' className="btn btn-primary modal-btn w-25" 
            data-bs-dismiss={closeModal ? "modal" : null}
            disabled={formik.isSubmitting || (!formik.dirty || (isValid ? !formik.isValid : null))}>
                {formik.isSubmitting ?
                    <SpinnerLoad colorClass={'text-white'} inline={true} isSmall />
                : 'ذخیره'}
            </button>
        </div>
    );
}

export default SubmitBTN;
