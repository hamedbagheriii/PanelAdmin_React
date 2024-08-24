import axios from "axios"
import config from './config.json'
import { Alert } from "../utils/alert";

export const apiPath = config.onlineAPI;

// interceptors : رهگیری تمام رکوست های اکسیوس
axios.interceptors.response.use((res)=>{
    if(res.status !== 200 && res.status !== 201){
        if (typeof(res.data) == 'object') {
            let message = '';
            for (const key in res.data) {
                message = message + `${res.data[key]}`
            }
            res.data.message = message
        }
        Alert('مشکلی پیش آمده است .' , `${res.data.message}` , 'error')
    }
    return res;
},(error)=>{
    Alert( error.response.status ,'مشکلی از سمت سرور رخ داده است .' , 'error');
    console.log(error);
    return (error)
})


const httpService = (url , method , data=null , params=null , contentType=null)=>{
    const tokenInfo = JSON.parse(localStorage.getItem('loginToken'));

    return axios({
        url : `${config.onlineAPI}/api${url}`,
        method,
        data,
        params,
        headers : {
            Authorization : tokenInfo ? `Bearer ${tokenInfo.token}` : null ,
            'Content-Type' : contentType ? contentType : 'application/json'
        }
    })
}

export default httpService;