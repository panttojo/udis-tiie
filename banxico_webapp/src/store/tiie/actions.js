import {
	GET_ALL_TIIE_ERROR,
	GET_ALL_TIIE_REQUEST,
	GET_ALL_TIIE_SUCCESS,
} from "./actionTypes";


/*----------------------------------------------------------------------
| GET ALL
----------------------------------------------------------------------*/
const getAllRequest = params => {
	return {
		type: GET_ALL_TIIE_REQUEST,
		payload: params
	}
}

const getAllSuccess = data => {
	return {
		type: GET_ALL_TIIE_SUCCESS,
		payload: data
	}
}

const getAllError = errors => {
	return {
		type: GET_ALL_TIIE_ERROR,
		payload: errors
	}
}


const actions = {
	getAllRequest,
	getAllSuccess,
	getAllError,
}
export default actions
