import React from 'react';
import { createPortal } from 'react-dom';

const ModalsContainer = ({children , id , fullscreen , title}) => {
    return createPortal(
        <div className="modal fade" id={id} >
            <div className={`modal-dialog ${fullscreen ? 'modal-fullscreen' : null} `}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title flex-fill" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" ></button>
                    </div>
                    <div className="modal-body w-100 d-flex align-items-center mx-auto">
                        {/* ==== modal body ==== */}
                            {children}
                        {/* ==== modal body ==== */}
                    </div>
                    <div className="modal-footer w-100 d-flex justify-content-around">
                        <button type="button" className="btn btn-danger modal-btn w-25" data-bs-dismiss="modal">انصراف</button>
                        <button type='submit' className="btn btn-primary modal-btn w-25">ذخیره</button>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.getElementById('modals-root')
    );
}

export default ModalsContainer;