import React from 'react';
import Index from './layouts/admin/Index';
import { BrowserRouter } from 'react-router-dom';


const App = ()=>{


    
    return (
        <div className={` App  `}>
            <BrowserRouter>
                <Index/>
            </BrowserRouter>
        </div>
    ) 
}


export default App;  