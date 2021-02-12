import {
	GET_ALL_UDIS_ERROR,
	GET_ALL_UDIS_REQUEST,
	GET_ALL_UDIS_SUCCESS,
} from "./actionTypes";


/*----------------------------------------------------------------------
| GET ALL
----------------------------------------------------------------------*/
const getAllRequest = params => {
	return {
		type: GET_ALL_UDIS_REQUEST,
		payload: params
	}
}

const getAllSuccess = data => {
	return {
		type: GET_ALL_UDIS_SUCCESS,
		payload: data
	}
}

const getAllError = errors => {
	return {
		type: GET_ALL_UDIS_ERROR,
		payload: errors
	}
}


const actions = {
	getAllRequest,
	getAllSuccess,
	getAllError,
}
export default actions
