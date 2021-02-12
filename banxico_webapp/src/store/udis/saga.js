import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import {
	GET_ALL_UDIS_REQUEST,
} from './actionTypes';
import actions from './actions';
import services from './services'


function* getAll({ payload }) {
	try {
		const response = yield call(services.getAll, payload)
		yield put(actions.getAllSuccess(response))
	} catch (error) {
		yield put(actions.getAllError(error))
	}
}


export function* watchUdisGetAll() {
	yield takeEvery(GET_ALL_UDIS_REQUEST, getAll)
}


function* udisSaga() {
	yield all([
		fork(watchUdisGetAll),
	]);
}

export default udisSaga;
