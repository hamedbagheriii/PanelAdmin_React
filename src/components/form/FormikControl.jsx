import React from 'react';
import Input from './formikComponent/input';
import Select from './formikComponent/select';
import Textarea from './formikComponent/textarea';
import File from './formikComponent/File';
import Switch from './formikComponent/Switch';
import SelectChips from './formikComponent/SelectChips';
import SearchableSelect from './formikComponent/SearchableSelect';
import CkEditor from './formikComponent/CkEditor';

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

        case 'selectChips':
            return <SelectChips {...props} />

        case 'searchableSelect':
            return <SearchableSelect {...props} />

        case 'ckEditor':
            return <CkEditor {...props} />

        default:
            return null;
    }
}

export default FormikControl;
