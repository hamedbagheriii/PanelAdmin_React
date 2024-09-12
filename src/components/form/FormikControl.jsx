import React from 'react';
import Input from './formikComponent/input';
import Select from './formikComponent/select';
import Textarea from './formikComponent/textarea';
import File from './formikComponent/File';
import Switch from './formikComponent/Switch';
import SelectChips from './formikComponent/SelectChips';
import SearchableSelect from './formikComponent/SearchableSelect';
import CkEditor from './formikComponent/CkEditor';
import Date from './formikComponent/Date';
import Checkbox from './formikComponent/checkbox';
import SelectSearch1 from './formikComponent/SelectSearch';

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

        case 'date':
            return <Date {...props} />

        case 'checkbox':
            return <Checkbox {...props} />

        case 'selectSearch':
            return <SelectSearch1 {...props} />
        default:
            return null;
    }
}

export default FormikControl;
