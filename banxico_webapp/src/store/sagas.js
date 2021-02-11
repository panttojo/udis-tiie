import { all } from 'redux-saga/effects';

import LayoutSaga from './layout/saga'
import authSaga from "./auth/saga"


export default function* rootSaga() {
    yield all([
        LayoutSaga(),
        authSaga(),
    ])
}
