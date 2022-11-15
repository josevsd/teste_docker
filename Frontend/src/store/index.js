import { configureStore } from "@reduxjs/toolkit";
import Token from "../reducers/Token";
import GetValue from "../reducers/GetValue";
import NavData from "../reducers/NavigationData";
export default configureStore({
    reducer:{
        Token,
        GetValue,
        NavData
    
    },
});