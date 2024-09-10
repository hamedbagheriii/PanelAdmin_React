import { RECEIVE_USER_RESPONSE } from "./userType"

const initalState = {
    loading : false ,
    user : [],
    error : ''
}




const userReducer = (state=initalState , action)=>{
    switch (action.type) {
        case RECEIVE_USER_RESPONSE :
            return {...state , loading : false , user : action.payLoad}

        default :
            return state;
    }
};




export default userReducer;