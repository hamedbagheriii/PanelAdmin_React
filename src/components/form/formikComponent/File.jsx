import { ErrorMessage, FastField } from "formik";
import React from "react";
import PersonalError from "../personalComponenet/personalError";

const File = ({name, label, className, placeholder }) => {
    return (
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
                <span className="input-group-text w_6rem justify-content-center"> {label} </span>
              </div>
              <ErrorMessage name={name} className="border" component={PersonalError}/>
            </div>
          );
        }}
      </FastField>
    );
};

export default File;