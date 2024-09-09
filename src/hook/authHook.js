import axios from "axios";
import { useEffect, useState } from "react";
import { getUserService } from "../services/auth";
import { useDispatch } from "react-redux";
import { receiveRolesResponse } from "../redux/roles/rolesActions";
 

export const useInLogin = ()=>{
    const [isLogin , setIsLogin] = useState(false);
    const [loading , setLoading] = useState(true);
    const [isAdmin , setIsAdmin] = useState(false);
    const dispatch = useDispatch();

    const handleSetLoad = (val1,val2,val3,time)=>{
        setTimeout(() => {
            setIsLogin(val1);
            setLoading(val2);
            setIsAdmin(val3)
        }, time);
    } 

    const handleGetUser = async ()=>{
        try {
            const res = await getUserService();
            handleSetLoad((res.status == 200 ? true : false ) , false ,
            (res.data.roles[0] ? true : false) , 2000)
            dispatch(receiveRolesResponse(res.data.roles));
        } catch (error) {
            localStorage.removeItem('loginToken');
            handleSetLoad(false,false,false,0);
        }
    }

    useEffect(() => {
        const loginToken = JSON.parse(localStorage.getItem('loginToken'));
        if(loginToken){
            handleGetUser();
        }
        else{
            handleSetLoad(false,false,false,0)
        }
    }, []);



    return {loading , isLogin , isAdmin}
}