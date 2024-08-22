import { createContext, useState } from "react";

export const categoryContext = createContext({
    editId : null ,
    setEditId : ()=>{}
});


const CategoryContextContainer = ({children})=>{
    const [editId , setEditId] = useState(null);

    return(
        <categoryContext.Provider value={{editId , setEditId}}>
            {children}
        </categoryContext.Provider>
    )
}

export default CategoryContextContainer;