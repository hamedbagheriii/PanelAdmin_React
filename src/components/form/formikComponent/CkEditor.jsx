import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Font, Heading, List, Link } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { ErrorMessage, Field } from 'formik';
import PersonalError from '../personalComponenet/personalError';

const CkEditor = ({name, label, className, placeholder}) => {
    return (
        <Field >
            {({form})=>{
                return (
                    <div className='w-100 my-2 mb-3 me-3 me-md-0 p-0 col-12 '>
                        <div className='w-100 d-flex mb-3 d-md-block p-0 ckEditorCompo'>
                            <CKEditor

                                editor={ ClassicEditor }
                                data={form.values[name] || `<p>${label} : ${placeholder}</p>`}
                                onReady={editor => {console.log('ready')}}
                                onChange={(event , editor)=>{
                                    const data = editor.getData();
                                    form.setFieldValue(name , data)
                                }}
                                onBlur={(event , editor)=>{
                                    form.setFieldTouched(name)
                                }}
                                onFocus={(event , editor)=>
                                    editor.getData() == `<p>${label} : ${placeholder}</p>` ? editor.setData('') : null
                                }
                                config={ {
                                    plugins: [
                                        Bold, Essentials, Italic, Mention, Paragraph, Undo , Font , Heading , List , Link
                                        ,
                                    ]
                                    ,
                                    toolbar: [ 'heading' , '|', 'bold', 'italic', 'link' ,'bulletedList', 'numberedList' ,'|' ,
                                    'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor' , 'undo', 'redo', '|',] ,
                                }}
                            />
                        </div>
                        <ErrorMessage name={name} component={PersonalError} />
                    </div>
                )
            }}
        </Field>
    );
}

export default CkEditor;
