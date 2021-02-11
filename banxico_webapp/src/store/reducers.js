import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";
import auth from "./auth/reducer"


const rootReducer = combineReducers({
    Layout,
    auth,
});

export default rootReducer;
