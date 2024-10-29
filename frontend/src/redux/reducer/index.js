import authReducer from './authReducer';
import handleCart from './handleCart'
import { combineReducers } from "redux";
const rootReducers = combineReducers({
    handleCart,
    auth: authReducer
})
export default rootReducers