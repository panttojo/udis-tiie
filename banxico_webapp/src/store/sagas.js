import { all } from 'redux-saga/effects';

import LayoutSaga from './layout/saga'
import authSaga from "./auth/saga"
import udisSaga from "./udis/saga"


export default function* rootSaga() {
    yield all([
        LayoutSaga(),
        authSaga(),
        udisSaga()
    ])
}
