import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api'
import { setEmailAddress } from './reducer';
import {PayloadAction} from "@reduxjs/toolkit";

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

function* fetchMessages(action: PayloadAction) {
  try {
    // @ts-ignore
    yield call(Api.fetchMessages, action.payload);
    // const emailAddress = yield call(Api.fetchNewEmailAddress);
    // yield put(setEmailAddress(emailAddress));
  } catch (e) {
    yield put({type: "FETCH_MESSAGES_FAIL", message: e.message});
  }
}

function* fetchMessagesSaga() {
  yield takeLatest("FETCH_MESSAGES", fetchMessages);
}

export {
  fetchNewEmailAddressSaga,
  fetchMessagesSaga,
};
