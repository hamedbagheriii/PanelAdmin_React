import { ErrorMessage, FastField } from "formik";
import React from "react";
import PersonalError from "../personalComponenet/personalError";

const File = ({name, label, className, placeholder , formik}) => {
    return (
      <>
        <FastField>
          {({form}) => {
            return (
              <div className={`col-12 mb-2 ${className}`}>
                <div className="input-group mb-2 dir_ltr">
                  <input
                    type="file"
                    className="form-control"
                    name={name}
                    placeholder={placeholder}
                    onChange={(e)=>form.setFieldValue(name, e.target.files[0])}
                  />
                  <span className="input-group-text w_7rem text_wrap justify-content-center"> {label} </span>
                </div>
              </div>
            );
          }}
        </FastField>
        {formik.errors[name] ? 
        <span className={`w-auto ms-auto text-white bg-dark p-1 px-2 me-2 rounded-3 border`} style={{fontSize:13}}>
          <i className="fas fa-exclamation-triangle ps-2 text-danger"></i>
            {formik.errors[name]}
          </span>
        : null }
      </>
    );
};

export default File;