import { configureStore, createReducer } from "@reduxjs/toolkit";
import rolesReducer from "../roles/rolesReducer";


const store = configureStore({
    reducer : {
        rolesReducer : rolesReducer ,
    },
})



export default store;