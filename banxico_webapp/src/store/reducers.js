import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";
import auth from "./auth/reducer"
import udis from "./udis/reducer"
import tiie from "./tiie/reducer"


const rootReducer = combineReducers({
    Layout,
    auth,
    udis,
    tiie,
});

export default rootReducer;
