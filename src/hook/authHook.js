import axios from "axios";
import { useEffect, useState } from "react";
import { getUserService } from "../services/auth";

export const useInLogin = ()=>{
    const [isLogin , setIsLogin] = useState(false);
    const [loading , setLoading] = useState(true);

    const handleSetLoad = (val1,val2,time)=>{
        setTimeout(() => {
            setIsLogin(val1);
            setLoading(val2);
        }, time);
    } 

    const handleGetUser = async ()=>{
        try {
            const res = await getUserService();
            handleSetLoad(res.status == 200 ? true : false , false , 2000)
        } catch (error) {
            localStorage.removeItem('loginToken');
            handleSetLoad(false,false,0);
        }
    }

    useEffect(() => {
        const loginToken = JSON.parse(localStorage.getItem('loginToken'));
        if(loginToken){
            handleGetUser();
        }
        else{
            handleSetLoad(false,false,0)
        }
    }, []);



    return {loading , isLogin}
}