import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import {
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
} from './actionTypes';
import userActions from './actions';
import userServices from './services'


function* login({ payload: { user } }) {
	try {
		const response = yield call(userServices.login, user)
		yield put(userActions.loginSuccess(response))
	} catch (error) {
		yield put(userActions.loginError(error))
	}
}

function* logout({ payload: { user, history } }) {
	try {
		const response = yield call(userServices.logout, user)
		yield put(userActions.logoutSuccess(response))
		history.push('/login')
	} catch (error) {
		yield put(userActions.logoutError(error))
	}
}

export function* watchUserLogin() {
	yield takeEvery(LOGIN_REQUEST, login)
}

export function* watchUserLogout() {
	yield takeEvery(LOGOUT_REQUEST, logout)
}

function* usersSaga() {
	yield all([
		fork(watchUserLogin),
		fork(watchUserLogout),
	]);
}

export default usersSaga;
