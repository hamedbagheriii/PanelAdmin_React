import { getUserService } from "../../services/auth";
import { RECEIVE_ROLES_RESPONSE, SEND_ROLES_REQUEST } from "./rolesType"


export const receiveRolesResponse = (data)=>{
    return {
        type : RECEIVE_ROLES_RESPONSE,
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