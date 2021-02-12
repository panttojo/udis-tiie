import {
	GET_ALL_TIIE_ERROR,
	GET_ALL_TIIE_REQUEST,
	GET_ALL_TIIE_SUCCESS,
} from './actionTypes';

const singleObj = {
	loading: false,
	data: {},
	errors: {},
	success: false
}


const roles = (state = singleObj, action) => {
	switch (action.type) {
		/*----------------------------------------------------------------------
		| GET ALL
		----------------------------------------------------------------------*/
		case GET_ALL_TIIE_REQUEST:
			state = {
				...singleObj,
				loading: true,
				success: false,
			}
			break;
		case GET_ALL_TIIE_SUCCESS:
			state = {
				data: action.payload,
				loading: false,
				success: true,
			}
			break;
		case GET_ALL_TIIE_ERROR:
			state = {
				loading: false,
				errors: action.payload,
				success: false,
			}
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
}

export default roles;
