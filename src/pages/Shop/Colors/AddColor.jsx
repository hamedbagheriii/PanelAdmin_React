import React from 'react';
import BtnModal from '../../../UI/pages/btnModal';
import ModalsContainer from '../../../components/ModalsContainer';

const AddColor = () => {
    return (
        <>
            <BtnModal id={`add_color_modal`} />
            
            <ModalsContainer
             id={'add_color_modal'}
             fullscreen={false}
             title={'افزودن رنگ'}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="input-group my-3 dir_ltr">
                                <input type="text" className="form-control" placeholder="" />
                                <span className="input-group-text w_8rem justify-content-center">نام رنگ</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="exampleColorInput" className="form-label">انتخاب رنگ</label>
                            <input type="color" className="form-control form-control-color" id="exampleColorInput" defaultValue="#563d7c" title="Choose your color" />
                        </div>                        
                    </div>
                </div>
            </ModalsContainer>
        </>
    );
}

export default AddColor;
