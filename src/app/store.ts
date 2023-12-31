import {configureStore} from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import inboxReducer from './reducer'
import {fetchNewEmailAddressSaga, fetchMessagesSaga, deleteMessageSaga} from "./sagas";

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'TempEmail',
  storage,
  whitelist: ['emailAddress']
}

const persistedReducer = persistReducer(persistConfig, inboxReducer)

export const store = configureStore({
  reducer: {
    inbox: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})
export const persistor = persistStore(store)

sagaMiddleware.run(fetchNewEmailAddressSaga)
sagaMiddleware.run(fetchMessagesSaga)
sagaMiddleware.run(deleteMessageSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
