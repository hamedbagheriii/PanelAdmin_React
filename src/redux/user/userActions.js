
import { RECEIVE_USER_RESPONSE } from "./userType"


export const receiveUserResponse = (data)=>{
    return {
        type : RECEIVE_USER_RESPONSE,
        payLoad : data
    }
};



//! چون قبلا همه این کار هارد با هوک کردیم دیگه نیاز به این کارا نیست و فقط یک اکشن برای دادن
//! مقدار در زمانی که لاگین برسی میکنیم نیازه
// export const getRolesActionRedux = ()=>{
//     return (dispatch , state)=>{
//         dispatch(sendRolesRequest())
//         getUserService().then(res=>{
//             dispatch(receiveRolesResponse(res.data.roles));
//         }).catch(error=>{
//             dispatch(receiveRolesError(error.message))
//         })
//     }
// }