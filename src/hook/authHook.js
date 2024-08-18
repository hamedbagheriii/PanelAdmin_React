import axios from "axios";
import { useEffect, useState } from "react";

export const useInLogin = ()=>{
    const [isLogin , setIsLogin] = useState(false);
    const [loading , setLoading] = useState(true);

    const handleSetLoad = (val1,val2,time)=>{
        setTimeout(() => {
            setIsLogin(val1);
            setLoading(val2);
        }, time);
    } 

    useEffect(() => {
        const loginToken = JSON.parse(localStorage.getItem('loginToken'));
        if(loginToken){
            axios.get('https://ecomadminapi.azhadev.ir/api/auth/user' , {
                headers : {
                    'Authorization' : `Bearer ${loginToken.token}`
                }
            }).then(res=>{
                console.log(res);
                handleSetLoad(res.status == 200 ? true : false , false , 2000)
            }).catch(err=>{
                localStorage.removeItem('loginToken');
                handleSetLoad(false,false,0);
            })
        }
        else{
            handleSetLoad(false,false,0)
        }
    }, []);



    return {loading , isLogin}
}