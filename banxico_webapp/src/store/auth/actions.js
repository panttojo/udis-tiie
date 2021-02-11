import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,

	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_ERROR,
} from "./actionTypes";


/*------------------------------------------------------------------------------
| LOGIN
------------------------------------------------------------------------------*/
const loginRequest = user => {
	return {
		type: LOGIN_REQUEST,
		payload: { user }
	}
}

const loginSuccess = data => {
	return {
		type: LOGIN_SUCCESS,
		payload: data
	}
}

const loginError = errors => {
	return {
		type: LOGIN_ERROR,
		payload: errors
	}
}

/*------------------------------------------------------------------------------
| LOGOUT
------------------------------------------------------------------------------*/
const logoutRequest = history => {
	return {
		type: LOGOUT_REQUEST,
		payload: { history }
	}
}

const logoutSuccess = () => {
	return {
		type: LOGOUT_SUCCESS,
		payload: {}
	}
}

const logoutError = errors => {
	return {
		type: LOGOUT_ERROR,
		payload: errors
	}
}


const userActions = {
	loginRequest,
	loginSuccess,
	loginError,

	logoutRequest,
	logoutSuccess,
	logoutError,
}
export default userActions
