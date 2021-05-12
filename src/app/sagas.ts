import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api'
import {setEmailAddress, setTimestamp, addMessages, removeMessage} from './reducer'
import {PayloadAction} from "@reduxjs/toolkit"

function* fetchNewEmailAddress() {
  try {
    // @ts-ignore
    const emailAddress = yield call(Api.fetchNewEmailAddress)
    yield put(setEmailAddress(emailAddress))
  } catch (e) {
    yield put({type: "FETCH_NEW_EMAIL_ADDRESS_FAIL", message: e.message})
  }
}

function* fetchNewEmailAddressSaga() {
  yield takeLatest("FETCH_NEW_EMAIL_ADDRESS", fetchNewEmailAddress)
}

function* fetchMessages(action: PayloadAction) {
  try {
    // @ts-ignore
    const {timestamp, messages} = yield call(Api.fetchMessages, action.payload)
    yield put(setTimestamp(timestamp))
    yield put(addMessages(messages))
  } catch (e) {
    yield put({type: "FETCH_MESSAGES_FAIL", message: e.message})
  }
}

function* fetchMessagesSaga() {
  yield takeLatest("FETCH_MESSAGES", fetchMessages)
}

function* deleteMessage(action: PayloadAction) {
  try {
    // @ts-ignore
    yield put(removeMessage(action.payload.message))
    // @ts-ignore
    yield call(Api.deleteMessage, action.payload)
  } catch (e) {
    yield put({type: "DELETE_MESSAGE_FAIL", message: e.message})
  }
}

function* deleteMessageSaga() {
  yield takeLatest("DELETE_MESSAGE", deleteMessage)
}

export {
  fetchNewEmailAddressSaga,
  fetchMessagesSaga,
  deleteMessageSaga,
}
