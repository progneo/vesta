import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@/store/authSlice'

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['authState']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer)
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})
