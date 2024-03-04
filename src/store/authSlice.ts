import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import UserData from '@/types/UserData'

export interface AuthState {
  isAuthorized: boolean
  firstName: string
  lastName: string
  patronymic: string
  role: string
}

const initialState: AuthState = {
  isAuthorized: false,
  firstName: '',
  lastName: '',
  patronymic: '',
  role: 'guest'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.patronymic = action.payload.patronymic
      state.role = action.payload.role
    },
    eraseAuthState: (state, action: PayloadAction<null>) => {
      state.firstName = ''
      state.lastName = ''
      state.patronymic = ''
      state.role = 'guest'
    }
  }
})

export const { setAuthState, setUserData, eraseAuthState } = authSlice.actions
export const authReducer = authSlice.reducer
