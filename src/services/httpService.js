import axios from "axios"
import config from './config.json'

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