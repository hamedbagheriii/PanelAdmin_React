import { RECEIVE_ROLES_ERROR, RECEIVE_ROLES_RESPONSE, SEND_ROLES_REQUEST } from "./rolesType"

const initalState = {
    loading : false ,
    roles : [],
    error : ''
}




const rolesReducer = (state=initalState , action)=>{
    switch (action.type) {
        case RECEIVE_ROLES_RESPONSE :
            return {...state , loading : false , roles : action.payLoad}

        default :
            return state;
    }
};




export default rolesReducer;