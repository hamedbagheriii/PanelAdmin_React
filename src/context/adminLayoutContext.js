import { createContext, useState } from "react";

export const adminContext = createContext({
    showSlidebar : false ,
    setShowSlidebar : ()=>{} ,
    showSlidebarSM : false ,
    setShowSlidebarSM : ()=>{}
})


const AdminContextContainer = ({children})=>{
    const [showSlidebar , setShowSlidebar] = useState(false);
    const [showSlidebarSM , setShowSlidebarSM] = useState(false);

    return(
        <adminContext.Provider value={{
            showSlidebar , 
            setShowSlidebar ,
            showSlidebarSM , 
            setShowSlidebarSM ,
        }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminContextContainer;