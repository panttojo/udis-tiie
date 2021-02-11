import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,

	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_ERROR,
} from './actionTypes';

const singleObj = {
	loading: false,
	data: {},
	errors: {},
	success: false
}

const initialState = singleObj


const authUser = process.env.REACT_APP_LOCAL_STORAGE_USER
initialState.data = localStorage.getItem(authUser) ? { ...JSON.parse(localStorage.getItem(authUser)) } : singleObj

const users = (state = initialState, action) => {
	switch (action.type) {
		/*----------------------------------------------------------------------
		| LOGIN
		----------------------------------------------------------------------*/
		case LOGIN_REQUEST:
			localStorage.removeItem(authUser)
			state = {
				...state,
				loading: true,
				success: false,
			}
			break;
		case LOGIN_SUCCESS:
			const user = action.payload
			localStorage.setItem(authUser, JSON.stringify(user))
			state = {
				...state,
				data: user,
				loading: false,
				success: true,
			}
			break;
		case LOGIN_ERROR:
			state = {
				...state,
				loading: false,
				errors: action.payload,
				success: false,
			}
			break;

		/*----------------------------------------------------------------------
		| LOGOUT
		----------------------------------------------------------------------*/
		case LOGOUT_REQUEST:
			localStorage.removeItem(authUser)
			state = {
				...state,
				loading: true,
				success: false,
			}
			break;
		case LOGOUT_SUCCESS:
			state = {
				...state,
				loading: false,
				success: true,
				data: {}
			}
			break;
		case LOGOUT_ERROR:
			state = {
				...state,
				loading: false,
				errors: action.payload,
				success: false,
			}
			break;

		/*----------------------------------------------------------------------
		| DEFAULT
		----------------------------------------------------------------------*/
		default:
			state = { ...state };
			break;
	}
	return state;
}

export default users;
