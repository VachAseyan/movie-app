import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {User} from 'firebase/auth'

interface AuthState {
  isLoggedIn: boolean
  user: User | null
}

const getUserFromStorage = (): User | null => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('user'),
  user: getUserFromStorage(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User | null }>) {
      const { user } = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      state.isLoggedIn = true
      state.user = user
    },
    logout(state) {
      localStorage.removeItem('user')
      state.isLoggedIn = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer