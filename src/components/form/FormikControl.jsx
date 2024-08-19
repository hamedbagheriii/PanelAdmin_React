import React from 'react';
import Input from './formikComponent/input';
import Select from './formikComponent/select';
import Textarea from './formikComponent/textarea';
import File from './formikComponent/File';
import Switch from './formikComponent/Switch';

const FormikControl = (props) => {
    switch (props.control) {
        case 'select':
            return <Select {...props} />     
    
        case 'input':
            return <Input {...props} />

        case 'textarea':
            return <Textarea {...props} />  
                
        case 'file':
            return <File {...props} /> 

        case 'switch':
            return <Switch {...props} />

        default:
            return null;
    }
}

export default FormikControl;
