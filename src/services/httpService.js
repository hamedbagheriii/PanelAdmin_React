import axios from "axios"
import config from './config.json'
import { Alert } from "../utils/alert";

// interceptors : رهگیری تمام رکوست های اکسیوس
axios.interceptors.response.use((res)=>{
    if(res.status !== 200 && res.status !== 201){
        Alert('مشکلی پیش آمده است .' , `${res.data.message}` , 'error')
    }
    return res;
},(error)=>{
    Alert( error.response.status ,'مشکلی از سمت سرور رخ داده است .' , 'error')
    return (error)
})


const httpService = (url , method , data=null , params=null )=>{
    const tokenInfo = JSON.parse(localStorage.getItem('loginToken'));

    return axios({
        url : `${config.onlineAPI}${url}`,
        method,
        data,
        params,
        headers : {
            Authorization : tokenInfo ? `Bearer ${tokenInfo.token}` : null ,
            'Content-Type' : 'application/json'
        }
    })
}

export default httpService;