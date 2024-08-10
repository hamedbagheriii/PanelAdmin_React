import { createContext, useState } from "react";

export const adminContext = createContext({
    showSlidebar : false ,
    setShowSlidebar : ()=>{}
})


const AdminContextContainer = ({children})=>{
    const [showSlidebar , setShowSlidebar] = useState(false);

    return(
        <adminContext.Provider value={{
            showSlidebar , 
            setShowSlidebar ,
        }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminContextContainer;