import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api'
import { setEmailAddress } from './reducer';

function* fetchNewEmailAddress() {
  try {
    // @ts-ignore
    const emailAddress = yield call(Api.fetchNewEmailAddress);
    yield put(setEmailAddress(emailAddress));
  } catch (e) {
    yield put({type: "FETCH_NEW_EMAIL_ADDRESS_FAIL", message: e.message});
  }
}

function* fetchNewEmailAddressSaga() {
  yield takeLatest("FETCH_NEW_EMAIL_ADDRESS", fetchNewEmailAddress);
}

export default fetchNewEmailAddressSaga;
